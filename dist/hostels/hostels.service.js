"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var HostelsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostelsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hostel_schema_1 = require("./schemas/hostel.schema");
const room_schema_1 = require("./schemas/room.schema");
const account_schema_1 = require("../accounts/schemas/account.schema");
const email_service_1 = require("../auth/email.service");
let HostelsService = HostelsService_1 = class HostelsService {
    constructor(hostelModel, roomModel, accountModel, emailService) {
        this.hostelModel = hostelModel;
        this.roomModel = roomModel;
        this.accountModel = accountModel;
        this.emailService = emailService;
        this.logger = new common_1.Logger(HostelsService_1.name);
    }
    async getHostelDataByManager(managerId) {
        let hostel = await this.hostelModel.findOne({ managerId });
        if (!hostel) {
            hostel = await this.hostelModel.create({
                managerId,
                name: 'My New Hostel',
                verificationStatus: 'Draft',
                isVerified: false,
            });
        }
        const rooms = await this.roomModel.find({ hostelId: hostel._id });
        return { hostel, rooms };
    }
    async updateHostel(managerId, data) {
        const hostel = await this.hostelModel.findOneAndUpdate({ managerId }, { $set: data }, { new: true });
        if (!hostel)
            throw new common_1.NotFoundException('Hostel not found');
        return hostel;
    }
    async addRoom(managerId, roomData) {
        const hostel = await this.hostelModel.findOne({ managerId });
        if (!hostel)
            throw new common_1.NotFoundException('Hostel not found');
        const newRoom = new this.roomModel({
            ...roomData,
            hostelId: hostel._id,
            availableRooms: roomData.totalRooms
        });
        return await newRoom.save();
    }
    async updateRoomQuantity(roomId, managerId, change) {
        const room = await this.roomModel.findById(roomId);
        if (!room)
            throw new common_1.NotFoundException('Room group not found');
        const newAvailable = room.availableRooms + change;
        if (newAvailable < 0 || newAvailable > room.totalRooms) {
            throw new common_1.BadRequestException('Invalid room quantity update');
        }
        room.availableRooms = newAvailable;
        await room.save();
        return room;
    }
    async applyVerification(managerId) {
        const hostel = await this.hostelModel.findOne({ managerId });
        if (!hostel)
            throw new common_1.NotFoundException('Hostel profile not found');
        if (hostel.verificationStatus !== 'Draft') {
            throw new common_1.BadRequestException('Application already submitted or verified.');
        }
        hostel.verificationStatus = 'Pending';
        await hostel.save();
        const manager = await this.accountModel.findById(managerId);
        if (manager) {
            const managerEmails = [manager.email];
            if (hostel.email && hostel.email !== manager.email)
                managerEmails.push(hostel.email);
            await this.emailService.sendVerificationApplicationManagerEmail(managerEmails, manager.firstName, hostel.name);
            const adminEmail = process.env.ADMIN_EMAIL || 'admin@nestshub.com';
            await this.emailService.sendVerificationApplicationAdminEmail(adminEmail, hostel.name, manager.phoneNumber);
            this.logger.log(`[SYSTEM NOTIFICATION] New Verification Request from ${hostel.name} (Manager: ${manager.firstName})`);
        }
        return { message: 'Verification application submitted successfully', status: 'Pending' };
    }
};
exports.HostelsService = HostelsService;
exports.HostelsService = HostelsService = HostelsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(hostel_schema_1.Hostel.name)),
    __param(1, (0, mongoose_1.InjectModel)(room_schema_1.Room.name)),
    __param(2, (0, mongoose_1.InjectModel)(account_schema_1.Account.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        email_service_1.EmailService])
], HostelsService);
//# sourceMappingURL=hostels.service.js.map