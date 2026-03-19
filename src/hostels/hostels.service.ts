import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Hostel, VerificationStatus } from './schemas/hostel.schema';
import { Room } from './schemas/room.schema';
import { CreateHostelDto, UpdateHostelDto, ApplyVerificationDto } from './dto/create-hostel.dto';
import { CreateRoomDto, UpdateRoomDto } from './dto/create-room.dto';

@Injectable()
export class HostelsService {
  constructor(
    @InjectModel(Hostel.name) private hostelModel: Model<Hostel>,
    @InjectModel(Room.name) private roomModel: Model<Room>,
  ) {}

  async createHostel(managerId: string, createHostelDto: CreateHostelDto): Promise<Hostel> {
    const hostel = new this.hostelModel({
      ...createHostelDto,
      managerId: new Types.ObjectId(managerId),
      amenities: createHostelDto.amenities || {},
      services: createHostelDto.services || {},
    });

    return hostel.save();
  }

  async findHostelByManager(managerId: string): Promise<Hostel> {
    const hostel = await this.hostelModel.findOne({ managerId: new Types.ObjectId(managerId) });
    if (!hostel) {
      throw new NotFoundException('Hostel not found for this manager');
    }
    return hostel;
  }

  async findHostelById(hostelId: string): Promise<Hostel> {
    const hostel = await this.hostelModel.findById(new Types.ObjectId(hostelId));
    if (!hostel) {
      throw new NotFoundException('Hostel not found');
    }
    return hostel;
  }

  async getAllHostels(skip = 0, limit = 10): Promise<{ data: Hostel[]; total: number }> {
    const [data, total] = await Promise.all([
      this.hostelModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
      this.hostelModel.countDocuments(),
    ]);
    return { data, total };
  }

  async getVerifiedHostels(skip = 0, limit = 10): Promise<{ data: Hostel[]; total: number }> {
    const [data, total] = await Promise.all([
      this.hostelModel
        .find({ verificationStatus: VerificationStatus.VERIFIED, isActive: true })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.hostelModel.countDocuments({
        verificationStatus: VerificationStatus.VERIFIED,
        isActive: true,
      }),
    ]);
    return { data, total };
  }

  async updateHostel(hostelId: string, managerId: string, updateHostelDto: UpdateHostelDto): Promise<Hostel> {
    const hostel = await this.findHostelById(hostelId);

    if (hostel.managerId.toString() !== managerId) {
      throw new BadRequestException('Unauthorized: You can only update your own hostel');
    }

    Object.assign(hostel, updateHostelDto);
    return hostel.save();
  }

  async applyVerification(hostelId: string, managerId: string, applyVerificationDto: ApplyVerificationDto): Promise<Hostel> {
    const hostel = await this.findHostelById(hostelId);

    if (hostel.managerId.toString() !== managerId) {
      throw new BadRequestException('Unauthorized: You can only apply for verification of your own hostel');
    }

    if (hostel.verificationStatus === VerificationStatus.PENDING) {
      throw new BadRequestException('Verification already pending for this hostel');
    }

    if (hostel.verificationStatus === VerificationStatus.VERIFIED) {
      throw new BadRequestException('This hostel is already verified');
    }

    hostel.verificationStatus = VerificationStatus.PENDING;
    hostel.verificationAppliedAt = new Date();

    return hostel.save();
  }

  async searchHostels(query: string, skip = 0, limit = 10): Promise<{ data: Hostel[]; total: number }> {
    const searchRegex = new RegExp(query, 'i');
    const [data, total] = await Promise.all([
      this.hostelModel
        .find({
          $or: [
            { name: searchRegex },
            { city: searchRegex },
            { address: searchRegex },
            { description: searchRegex },
          ],
          verificationStatus: VerificationStatus.VERIFIED,
          isActive: true,
        })
        .skip(skip)
        .limit(limit),
      this.hostelModel.countDocuments({
        $or: [
          { name: searchRegex },
          { city: searchRegex },
          { address: searchRegex },
          { description: searchRegex },
        ],
        verificationStatus: VerificationStatus.VERIFIED,
        isActive: true,
      }),
    ]);
    return { data, total };
  }

  // Room methods
  async createRoom(hostelId: string, managerId: string, createRoomDto: CreateRoomDto): Promise<Room> {
    const hostel = await this.findHostelById(hostelId);

    if (hostel.managerId.toString() !== managerId) {
      throw new BadRequestException('Unauthorized: You can only add rooms to your own hostel');
    }

    const room = new this.roomModel({
      ...createRoomDto,
      hostelId: new Types.ObjectId(hostelId),
    });

    return room.save();
  }

  async getRoomsByHostel(hostelId: string): Promise<Room[]> {
    return this.roomModel
      .find({ hostelId: new Types.ObjectId(hostelId) })
      .sort({ floor: 1, roomNumber: 1 });
  }

  async getRoomById(roomId: string): Promise<Room> {
    const room = await this.roomModel.findById(new Types.ObjectId(roomId));
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async updateRoom(
    roomId: string,
    hostelId: string,
    managerId: string,
    updateRoomDto: UpdateRoomDto,
  ): Promise<Room> {
    const hostel = await this.findHostelById(hostelId);

    if (hostel.managerId.toString() !== managerId) {
      throw new BadRequestException('Unauthorized: You can only update rooms in your own hostel');
    }

    const room = await this.getRoomById(roomId);

    if (room.hostelId.toString() !== hostelId) {
      throw new BadRequestException('This room does not belong to the specified hostel');
    }

    Object.assign(room, updateRoomDto);
    return room.save();
  }

  async deleteRoom(roomId: string, hostelId: string, managerId: string): Promise<void> {
    const hostel = await this.findHostelById(hostelId);

    if (hostel.managerId.toString() !== managerId) {
      throw new BadRequestException('Unauthorized: You can only delete rooms from your own hostel');
    }

    const room = await this.getRoomById(roomId);

    if (room.hostelId.toString() !== hostelId) {
      throw new BadRequestException('This room does not belong to the specified hostel');
    }

    await this.roomModel.findByIdAndDelete(new Types.ObjectId(roomId));
  }

  async getHostelStats(managerId: string) {
    const hostel = await this.findHostelByManager(managerId);
    const rooms = await this.getRoomsByHostel(hostel._id.toString());
    const availableRooms = rooms.filter((room) => room.isAvailable).length;

    return {
      hostelId: hostel._id,
      name: hostel.name,
      verificationStatus: hostel.verificationStatus,
      totalRooms: rooms.length,
      availableRooms,
      occupiedRooms: rooms.length - availableRooms,
      amenitiesCount: Object.values(hostel.amenities || {}).filter((v) => v === true).length,
    };
  }
}
