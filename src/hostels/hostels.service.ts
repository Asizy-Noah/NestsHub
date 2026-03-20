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

  hostel.verificationStatus = 'Pending';
  await hostel.save();

  const manager = await this.accountModel.findById(managerId);
  
  if (manager) {
    // 1. Collect all unique emails (Manager's email + any unique hostel emails)
    const managerEmails = new Set<string>();
    managerEmails.add(manager.email);
    
    // Add all emails from the hostel's email array if they exist
    if (hostel.emails && hostel.emails.length > 0) {
      hostel.emails.forEach(e => {
        if (e && e.trim() !== '') managerEmails.add(e.toLowerCase());
      });
    }

    // Convert Set back to Array for the email service
    const emailList = Array.from(managerEmails);

    // 2. Send Email to Manager & all associated Hostel Emails
    await this.emailService.sendVerificationApplicationManagerEmail(
      emailList, 
      manager.firstName, 
      hostel.name
    );

    // 3. Send Email to System Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@nestshub.com';
    await this.emailService.sendVerificationApplicationAdminEmail(
      adminEmail, 
      hostel.name, 
      manager.phoneNumber
    );
    
    this.logger.log(`[SYSTEM NOTIFICATION] New Verification Request from ${hostel.name}`);
  }

  return { message: 'Verification application submitted successfully', status: 'Pending' };
}
}