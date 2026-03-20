import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hostel } from './schemas/hostel.schema';
import { Room } from './schemas/room.schema';
import { Account } from '../accounts/schemas/account.schema';
import { EmailService } from '../auth/email.service';

@Injectable()
export class HostelsService {
  private readonly logger = new Logger(HostelsService.name);

  constructor(
    @InjectModel(Hostel.name) private hostelModel: Model<Hostel>,
    @InjectModel(Room.name) private roomModel: Model<Room>,
    @InjectModel(Account.name) private accountModel: Model<Account>,
    private emailService: EmailService,
  ) {}

  async getHostelDataByManager(managerId: string) {
    let hostel = await this.hostelModel.findOne({ managerId });
    
    // If the manager logs in for the first time, initialize a draft profile
    if (!hostel) {
      hostel = await this.hostelModel.create({
        managerId,
        name: 'My New Hostel', // Default placeholder
        verificationStatus: 'Draft',
        isVerified: false,
      });
    }

    const rooms = await this.roomModel.find({ hostelId: hostel._id });
    return { hostel, rooms };
  }

  async updateHostel(managerId: string, data: any) {
    const hostel = await this.hostelModel.findOneAndUpdate(
      { managerId },
      { $set: data },
      { new: true }
    );
    if (!hostel) throw new NotFoundException('Hostel not found');
    return hostel;
  }

  async addRoom(managerId: string, roomData: any) {
    const hostel = await this.hostelModel.findOne({ managerId });
    if (!hostel) throw new NotFoundException('Hostel not found');

    const newRoom = new this.roomModel({
      ...roomData,
      hostelId: hostel._id,
      availableRooms: roomData.totalRooms // Initially, all added rooms are available
    });
    return await newRoom.save();
  }

  async updateRoomQuantity(roomId: string, managerId: string, change: number) {
    const room = await this.roomModel.findById(roomId);
    if (!room) throw new NotFoundException('Room group not found');

    // Calculate new availability
    const newAvailable = room.availableRooms + change;
    
    if (newAvailable < 0 || newAvailable > room.totalRooms) {
      throw new BadRequestException('Invalid room quantity update');
    }

    room.availableRooms = newAvailable;
    await room.save();
    return room;
  }

  async applyVerification(managerId: string) {
    const hostel = await this.hostelModel.findOne({ managerId });
    if (!hostel) throw new NotFoundException('Hostel profile not found');
    
    if (hostel.verificationStatus !== 'Draft') {
      throw new BadRequestException('Application already submitted or verified.');
    }

    // Update status
    hostel.verificationStatus = 'Pending';
    await hostel.save();

    // Fetch Manager Details for the email
    const manager = await this.accountModel.findById(managerId);
    
    if (manager) {
      // 1. Send Email to Manager & Hostel Email
      const managerEmails = [manager.email];
      if (hostel.email && hostel.email !== manager.email) managerEmails.push(hostel.email);
      await this.emailService.sendVerificationApplicationManagerEmail(managerEmails, manager.firstName, hostel.name);

      // 2. Send Email to System Admin
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@nestshub.com';
      await this.emailService.sendVerificationApplicationAdminEmail(adminEmail, hostel.name, manager.phoneNumber);
      
      // 3. Create System Notification (Log for now, update if you have a Notification schema)
      this.logger.log(`[SYSTEM NOTIFICATION] New Verification Request from ${hostel.name} (Manager: ${manager.firstName})`);
    }

    return { message: 'Verification application submitted successfully', status: 'Pending' };
  }
}