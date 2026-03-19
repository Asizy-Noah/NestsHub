import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Hotel, VerificationStatus } from './schemas/hotel.schema';
import { HotelRoom } from './schemas/hotel-room.schema';
import { CreateHotelDto, UpdateHotelDto } from './dto/create-hotel.dto';
import { CreateHotelRoomDto, UpdateHotelRoomDto, UpdateRoomInventoryDto } from './dto/create-hotel-room.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel.name) private hotelModel: Model<Hotel>,
    @InjectModel(HotelRoom.name) private roomModel: Model<HotelRoom>,
  ) {}

  // Hotel Management Methods
  async createHotel(managerId: string, createHotelDto: CreateHotelDto): Promise<Hotel> {
    // Check if manager already has a hotel
    const existingHotel = await this.hotelModel.findOne({ managerId });
    if (existingHotel) {
      throw new BadRequestException('Hotel manager can only create one hotel');
    }

    const hotel = new this.hotelModel({
      ...createHotelDto,
      managerId,
      amenities: {
        gym: false,
        bar: false,
        restaurant: false,
        parkingSpace: false,
        storageBuilding: false,
        supermarketNearby: false,
      },
    });

    return hotel.save();
  }

  async getHotelByManager(managerId: string): Promise<Hotel> {
    const hotel = await this.hotelModel.findOne({ managerId });
    if (!hotel) {
      throw new NotFoundException('Hotel not found for this manager');
    }
    return hotel;
  }

  async getHotelById(id: string): Promise<Hotel> {
    const hotel = await this.hotelModel.findById(id);
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel;
  }

  async updateHotel(
    hotelId: string,
    managerId: string,
    updateHotelDto: UpdateHotelDto,
  ): Promise<Hotel> {
    const hotel = await this.getHotelById(hotelId);

    // Authorization check
    if (hotel.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only update your own hotel');
    }

    return this.hotelModel.findByIdAndUpdate(hotelId, updateHotelDto, {
      new: true,
      runValidators: true,
    });
  }

  async updateHotelAmenities(
    hotelId: string,
    managerId: string,
    amenities: any,
  ): Promise<Hotel> {
    const hotel = await this.getHotelById(hotelId);

    if (hotel.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only update your own hotel');
    }

    return this.hotelModel.findByIdAndUpdate(
      hotelId,
      { amenities },
      { new: true },
    );
  }

  async applyForVerification(hotelId: string, managerId: string): Promise<Hotel> {
    const hotel = await this.getHotelById(hotelId);

    if (hotel.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only apply for your own hotel');
    }

    if (hotel.verificationStatus === VerificationStatus.PENDING) {
      throw new BadRequestException('Verification application already pending');
    }

    if (hotel.verificationStatus === VerificationStatus.VERIFIED) {
      throw new BadRequestException('Hotel is already verified');
    }

    return this.hotelModel.findByIdAndUpdate(
      hotelId,
      {
        verificationStatus: VerificationStatus.PENDING,
        verificationAppliedAt: new Date(),
      },
      { new: true },
    );
  }

  async toggleHotelActive(
    hotelId: string,
    managerId: string,
    isActive: boolean,
  ): Promise<Hotel> {
    const hotel = await this.getHotelById(hotelId);

    if (hotel.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only toggle your own hotel');
    }

    return this.hotelModel.findByIdAndUpdate(hotelId, { isActive }, { new: true });
  }

  async searchHotels(
    query: string,
    district?: string,
    townOrCity?: string,
    verified?: boolean,
  ): Promise<Hotel[]> {
    const filters: any = { isActive: true };

    if (query) {
      filters.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ];
    }

    if (district) filters.district = { $regex: district, $options: 'i' };
    if (townOrCity) filters.townOrCity = { $regex: townOrCity, $options: 'i' };
    if (verified !== undefined) {
      filters.verificationStatus = verified
        ? VerificationStatus.VERIFIED
        : { $ne: VerificationStatus.VERIFIED };
    }

    return this.hotelModel.find(filters).sort({ createdAt: -1 }).exec();
  }

  async getVerifiedHotels(): Promise<Hotel[]> {
    return this.hotelModel
      .find({
        verificationStatus: VerificationStatus.VERIFIED,
        isActive: true,
      })
      .sort({ createdAt: -1 });
  }

  async getDashboardStats(managerId: string): Promise<any> {
    const hotel = await this.getHotelByManager(managerId);

    const totalRooms = await this.roomModel.aggregate([
      { $match: { hotelId: new Types.ObjectId(hotel._id) } },
      { $group: { _id: null, total: { $sum: '$totalRooms' } } },
    ]);

    const bookedRooms = await this.roomModel.aggregate([
      { $match: { hotelId: new Types.ObjectId(hotel._id) } },
      { $group: { _id: null, total: { $sum: '$bookedRooms' } } },
    ]);

    const roomsByType = await this.roomModel
      .find({ hotelId: hotel._id })
      .select('roomType totalRooms bookedRooms')
      .sort({ createdAt: -1 });

    const totalCount = totalRooms[0]?.total || 0;
    const bookedCount = bookedRooms[0]?.total || 0;
    const occupancyRate = totalCount > 0 ? Math.round((bookedCount / totalCount) * 100) : 0;

    return {
      hotel: {
        name: hotel.name,
        isVerified: hotel.verificationStatus === VerificationStatus.VERIFIED,
        verificationStatus: hotel.verificationStatus,
      },
      inventory: {
        totalRooms: totalCount,
        bookedRooms: bookedCount,
        availableRooms: totalCount - bookedCount,
        occupancyRate,
      },
      roomsByType,
    };
  }

  // Room Management Methods
  async createRoom(hotelId: string, managerId: string, createRoomDto: CreateHotelRoomDto): Promise<HotelRoom> {
    const hotel = await this.getHotelById(hotelId);

    if (hotel.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only add rooms to your own hotel');
    }

    const room = new this.roomModel({
      ...createRoomDto,
      hotelId,
      amenities: {
        hasBalcony: false,
        hasHotWater: false,
        hasTV: false,
        hasDSTV: false,
        hasTableChair: false,
      },
    });

    return room.save();
  }

  async getRoomById(id: string): Promise<HotelRoom> {
    const room = await this.roomModel.findById(id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  async getRoomsByHotel(hotelId: string): Promise<HotelRoom[]> {
    return this.roomModel.find({ hotelId }).sort({ createdAt: -1 });
  }

  async updateRoom(
    roomId: string,
    hotelId: string,
    managerId: string,
    updateRoomDto: UpdateHotelRoomDto,
  ): Promise<HotelRoom> {
    const room = await this.getRoomById(roomId);
    const hotel = await this.getHotelById(hotelId);

    if (hotel.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only update rooms in your own hotel');
    }

    return this.roomModel.findByIdAndUpdate(roomId, updateRoomDto, {
      new: true,
      runValidators: true,
    });
  }

  async updateRoomInventory(
    roomId: string,
    hotelId: string,
    managerId: string,
    inventoryDto: UpdateRoomInventoryDto,
  ): Promise<HotelRoom> {
    const room = await this.getRoomById(roomId);
    const hotel = await this.getHotelById(hotelId);

    if (hotel.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only update inventory in your own hotel');
    }

    if (inventoryDto.bookedRooms > room.totalRooms) {
      throw new BadRequestException('Booked rooms cannot exceed total rooms');
    }

    return this.roomModel.findByIdAndUpdate(
      roomId,
      { bookedRooms: inventoryDto.bookedRooms },
      { new: true },
    );
  }

  async deleteRoom(roomId: string, hotelId: string, managerId: string): Promise<void> {
    const room = await this.getRoomById(roomId);
    const hotel = await this.getHotelById(hotelId);

    if (hotel.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only delete rooms from your own hotel');
    }

    await this.roomModel.findByIdAndDelete(roomId);
  }

  async toggleRoomActive(
    roomId: string,
    hotelId: string,
    managerId: string,
    isActive: boolean,
  ): Promise<HotelRoom> {
    const room = await this.getRoomById(roomId);
    const hotel = await this.getHotelById(hotelId);

    if (hotel.managerId.toString() !== managerId) {
      throw new ForbiddenException('You can only toggle rooms in your own hotel');
    }

    return this.roomModel.findByIdAndUpdate(
      roomId,
      { isActive },
      { new: true },
    );
  }
}
