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
var HotelsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hotel_schema_1 = require("./schemas/hotel.schema");
const hotel_room_schema_1 = require("./schemas/hotel-room.schema");
const account_schema_1 = require("../accounts/schemas/account.schema");
const email_service_1 = require("../auth/email.service");
let HotelsService = HotelsService_1 = class HotelsService {
    constructor(hotelModel, roomModel, accountModel, emailService) {
        this.hotelModel = hotelModel;
        this.roomModel = roomModel;
        this.accountModel = accountModel;
        this.emailService = emailService;
        this.logger = new common_1.Logger(HotelsService_1.name);
    }
    async getHotelDataByManager(managerId) {
        let hotel = await this.hotelModel.findOne({ managerId });
        if (!hotel) {
            hotel = await this.hotelModel.create({
                managerId, name: 'My New Hotel', verificationStatus: 'Draft', isVerified: false,
            });
        }
        const rooms = await this.roomModel.find({ hotelId: hotel._id });
        return { hotel, rooms };
    }
    async updateHotel(managerId, data) {
        const hotel = await this.hotelModel.findOneAndUpdate({ managerId }, { $set: data }, { new: true });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        return hotel;
    }
    async addRoom(managerId, roomData) {
        const hotel = await this.hotelModel.findOne({ managerId });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        const newRoom = new this.roomModel({
            ...roomData, hotelId: hotel._id, availableRooms: roomData.totalRooms
        });
        return await newRoom.save();
    }
    async updateRoom(roomId, managerId, roomData) {
        const hotel = await this.hotelModel.findOne({ managerId });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        const { _id, hotelId, ...updateData } = roomData;
        if (updateData.totalRooms < updateData.availableRooms) {
            updateData.availableRooms = updateData.totalRooms;
        }
        const updatedRoom = await this.roomModel.findOneAndUpdate({ _id: roomId, hotelId: hotel._id }, { $set: updateData }, { new: true });
        if (!updatedRoom)
            throw new common_1.NotFoundException('Room not found');
        return updatedRoom;
    }
    async deleteRoom(roomId, managerId) {
        const hotel = await this.hotelModel.findOne({ managerId });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        const result = await this.roomModel.findOneAndDelete({ _id: roomId, hotelId: hotel._id });
        if (!result)
            throw new common_1.NotFoundException('Room not found');
        return { success: true };
    }
    async updateRoomQuantity(roomId, managerId, change) {
        const hotel = await this.hotelModel.findOne({ managerId });
        const room = await this.roomModel.findOne({ _id: roomId, hotelId: hotel?._id });
        if (!room)
            throw new common_1.NotFoundException('Room not found');
        const newAvailable = room.availableRooms + change;
        if (newAvailable < 0 || newAvailable > room.totalRooms) {
            throw new common_1.BadRequestException('Invalid room quantity update');
        }
        room.availableRooms = newAvailable;
        return await room.save();
    }
    async applyVerification(managerId) {
        const hotel = await this.hotelModel.findOne({ managerId });
        if (!hotel)
            throw new common_1.NotFoundException('Hotel not found');
        if (hotel.verificationStatus !== 'Draft')
            throw new common_1.BadRequestException('Already submitted');
        hotel.verificationStatus = 'Pending';
        await hotel.save();
        return { status: 'Pending' };
    }
    async getManagerAccount(managerId) {
        return await this.accountModel.findById(managerId).select('-password');
    }
};
exports.HotelsService = HotelsService;
exports.HotelsService = HotelsService = HotelsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(hotel_schema_1.Hotel.name)),
    __param(1, (0, mongoose_1.InjectModel)(hotel_room_schema_1.HotelRoom.name)),
    __param(2, (0, mongoose_1.InjectModel)(account_schema_1.Account.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        email_service_1.EmailService])
], HotelsService);
//# sourceMappingURL=hotels.service.js.map