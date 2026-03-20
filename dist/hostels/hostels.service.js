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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HostelsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hostel_schema_1 = require("./schemas/hostel.schema");
const room_schema_1 = require("./schemas/room.schema");
let HostelsService = class HostelsService {
    constructor(hostelModel, roomModel) {
        this.hostelModel = hostelModel;
        this.roomModel = roomModel;
    }
    async createHostel(managerId, createHostelDto) {
        const hostel = new this.hostelModel({
            ...createHostelDto,
            managerId: new mongoose_2.Types.ObjectId(managerId),
            amenities: createHostelDto.amenities || {},
            services: createHostelDto.services || {},
        });
        return hostel.save();
    }
    async findHostelByManager(managerId) {
        const hostel = await this.hostelModel.findOne({ managerId: new mongoose_2.Types.ObjectId(managerId) });
        if (!hostel) {
            throw new common_1.NotFoundException('Hostel not found for this manager');
        }
        return hostel;
    }
    async findHostelById(hostelId) {
        const hostel = await this.hostelModel.findById(new mongoose_2.Types.ObjectId(hostelId));
        if (!hostel) {
            throw new common_1.NotFoundException('Hostel not found');
        }
        return hostel;
    }
    async getAllHostels(skip = 0, limit = 10) {
        const [data, total] = await Promise.all([
            this.hostelModel.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
            this.hostelModel.countDocuments(),
        ]);
        return { data, total };
    }
    async getVerifiedHostels(skip = 0, limit = 10) {
        const [data, total] = await Promise.all([
            this.hostelModel
                .find({ verificationStatus: hostel_schema_1.VerificationStatus.VERIFIED, isActive: true })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            this.hostelModel.countDocuments({
                verificationStatus: hostel_schema_1.VerificationStatus.VERIFIED,
                isActive: true,
            }),
        ]);
        return { data, total };
    }
    async updateHostel(hostelId, managerId, updateHostelDto) {
        const hostel = await this.findHostelById(hostelId);
        if (hostel.managerId.toString() !== managerId) {
            throw new common_1.BadRequestException('Unauthorized: You can only update your own hostel');
        }
        Object.assign(hostel, updateHostelDto);
        return hostel.save();
    }
    async applyVerification(hostelId, managerId, applyVerificationDto) {
        const hostel = await this.findHostelById(hostelId);
        if (hostel.managerId.toString() !== managerId) {
            throw new common_1.BadRequestException('Unauthorized: You can only apply for verification of your own hostel');
        }
        if (hostel.verificationStatus === hostel_schema_1.VerificationStatus.PENDING) {
            throw new common_1.BadRequestException('Verification already pending for this hostel');
        }
        if (hostel.verificationStatus === hostel_schema_1.VerificationStatus.VERIFIED) {
            throw new common_1.BadRequestException('This hostel is already verified');
        }
        hostel.verificationStatus = hostel_schema_1.VerificationStatus.PENDING;
        hostel.verificationAppliedAt = new Date();
        return hostel.save();
    }
    async searchHostels(query, skip = 0, limit = 10) {
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
                verificationStatus: hostel_schema_1.VerificationStatus.VERIFIED,
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
                verificationStatus: hostel_schema_1.VerificationStatus.VERIFIED,
                isActive: true,
            }),
        ]);
        return { data, total };
    }
    async createRoom(hostelId, managerId, createRoomDto) {
        const hostel = await this.findHostelById(hostelId);
        if (hostel.managerId.toString() !== managerId) {
            throw new common_1.BadRequestException('Unauthorized: You can only add rooms to your own hostel');
        }
        const room = new this.roomModel({
            ...createRoomDto,
            hostelId: new mongoose_2.Types.ObjectId(hostelId),
        });
        return room.save();
    }
    async getRoomsByHostel(hostelId) {
        return this.roomModel
            .find({ hostelId: new mongoose_2.Types.ObjectId(hostelId) })
            .sort({ floor: 1, roomNumber: 1 });
    }
    async getRoomById(roomId) {
        const room = await this.roomModel.findById(new mongoose_2.Types.ObjectId(roomId));
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        return room;
    }
    async updateRoom(roomId, hostelId, managerId, updateRoomDto) {
        const hostel = await this.findHostelById(hostelId);
        if (hostel.managerId.toString() !== managerId) {
            throw new common_1.BadRequestException('Unauthorized: You can only update rooms in your own hostel');
        }
        const room = await this.getRoomById(roomId);
        if (room.hostelId.toString() !== hostelId) {
            throw new common_1.BadRequestException('This room does not belong to the specified hostel');
        }
        Object.assign(room, updateRoomDto);
        return room.save();
    }
    async deleteRoom(roomId, hostelId, managerId) {
        const hostel = await this.findHostelById(hostelId);
        if (hostel.managerId.toString() !== managerId) {
            throw new common_1.BadRequestException('Unauthorized: You can only delete rooms from your own hostel');
        }
        const room = await this.getRoomById(roomId);
        if (room.hostelId.toString() !== hostelId) {
            throw new common_1.BadRequestException('This room does not belong to the specified hostel');
        }
        await this.roomModel.findByIdAndDelete(new mongoose_2.Types.ObjectId(roomId));
    }
    async getHostelStats(managerId) {
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
};
exports.HostelsService = HostelsService;
exports.HostelsService = HostelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(hostel_schema_1.Hostel.name)),
    __param(1, (0, mongoose_1.InjectModel)(room_schema_1.Room.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], HostelsService);
//# sourceMappingURL=hostels.service.js.map