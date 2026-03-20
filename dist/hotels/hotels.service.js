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
exports.HotelsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const hotel_schema_1 = require("./schemas/hotel.schema");
const hotel_room_schema_1 = require("./schemas/hotel-room.schema");
let HotelsService = class HotelsService {
    constructor(hotelModel, roomModel) {
        this.hotelModel = hotelModel;
        this.roomModel = roomModel;
    }
    async createHotel(managerId, createHotelDto) {
        const existingHotel = await this.hotelModel.findOne({ managerId });
        if (existingHotel) {
            throw new common_1.BadRequestException('Hotel manager can only create one hotel');
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
    async getHotelByManager(managerId) {
        const hotel = await this.hotelModel.findOne({ managerId });
        if (!hotel) {
            throw new common_1.NotFoundException('Hotel not found for this manager');
        }
        return hotel;
    }
    async getHotelById(id) {
        const hotel = await this.hotelModel.findById(id);
        if (!hotel) {
            throw new common_1.NotFoundException('Hotel not found');
        }
        return hotel;
    }
    async updateHotel(hotelId, managerId, updateHotelDto) {
        const hotel = await this.getHotelById(hotelId);
        if (hotel.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only update your own hotel');
        }
        return this.hotelModel.findByIdAndUpdate(hotelId, updateHotelDto, {
            new: true,
            runValidators: true,
        });
    }
    async updateHotelAmenities(hotelId, managerId, amenities) {
        const hotel = await this.getHotelById(hotelId);
        if (hotel.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only update your own hotel');
        }
        return this.hotelModel.findByIdAndUpdate(hotelId, { amenities }, { new: true });
    }
    async applyForVerification(hotelId, managerId) {
        const hotel = await this.getHotelById(hotelId);
        if (hotel.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only apply for your own hotel');
        }
        if (hotel.verificationStatus === hotel_schema_1.VerificationStatus.PENDING) {
            throw new common_1.BadRequestException('Verification application already pending');
        }
        if (hotel.verificationStatus === hotel_schema_1.VerificationStatus.VERIFIED) {
            throw new common_1.BadRequestException('Hotel is already verified');
        }
        return this.hotelModel.findByIdAndUpdate(hotelId, {
            verificationStatus: hotel_schema_1.VerificationStatus.PENDING,
            verificationAppliedAt: new Date(),
        }, { new: true });
    }
    async toggleHotelActive(hotelId, managerId, isActive) {
        const hotel = await this.getHotelById(hotelId);
        if (hotel.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only toggle your own hotel');
        }
        return this.hotelModel.findByIdAndUpdate(hotelId, { isActive }, { new: true });
    }
    async searchHotels(query, district, townOrCity, verified) {
        const filters = { isActive: true };
        if (query) {
            filters.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ];
        }
        if (district)
            filters.district = { $regex: district, $options: 'i' };
        if (townOrCity)
            filters.townOrCity = { $regex: townOrCity, $options: 'i' };
        if (verified !== undefined) {
            filters.verificationStatus = verified
                ? hotel_schema_1.VerificationStatus.VERIFIED
                : { $ne: hotel_schema_1.VerificationStatus.VERIFIED };
        }
        return this.hotelModel.find(filters).sort({ createdAt: -1 }).exec();
    }
    async getVerifiedHotels() {
        return this.hotelModel
            .find({
            verificationStatus: hotel_schema_1.VerificationStatus.VERIFIED,
            isActive: true,
        })
            .sort({ createdAt: -1 });
    }
    async getDashboardStats(managerId) {
        const hotel = await this.getHotelByManager(managerId);
        const totalRooms = await this.roomModel.aggregate([
            { $match: { hotelId: new mongoose_2.Types.ObjectId(hotel._id) } },
            { $group: { _id: null, total: { $sum: '$totalRooms' } } },
        ]);
        const bookedRooms = await this.roomModel.aggregate([
            { $match: { hotelId: new mongoose_2.Types.ObjectId(hotel._id) } },
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
                isVerified: hotel.verificationStatus === hotel_schema_1.VerificationStatus.VERIFIED,
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
    async createRoom(hotelId, managerId, createRoomDto) {
        const hotel = await this.getHotelById(hotelId);
        if (hotel.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only add rooms to your own hotel');
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
    async getRoomById(id) {
        const room = await this.roomModel.findById(id);
        if (!room) {
            throw new common_1.NotFoundException('Room not found');
        }
        return room;
    }
    async getRoomsByHotel(hotelId) {
        return this.roomModel.find({ hotelId }).sort({ createdAt: -1 });
    }
    async updateRoom(roomId, hotelId, managerId, updateRoomDto) {
        const room = await this.getRoomById(roomId);
        const hotel = await this.getHotelById(hotelId);
        if (hotel.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only update rooms in your own hotel');
        }
        return this.roomModel.findByIdAndUpdate(roomId, updateRoomDto, {
            new: true,
            runValidators: true,
        });
    }
    async updateRoomInventory(roomId, hotelId, managerId, inventoryDto) {
        const room = await this.getRoomById(roomId);
        const hotel = await this.getHotelById(hotelId);
        if (hotel.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only update inventory in your own hotel');
        }
        if (inventoryDto.bookedRooms > room.totalRooms) {
            throw new common_1.BadRequestException('Booked rooms cannot exceed total rooms');
        }
        return this.roomModel.findByIdAndUpdate(roomId, { bookedRooms: inventoryDto.bookedRooms }, { new: true });
    }
    async deleteRoom(roomId, hotelId, managerId) {
        const room = await this.getRoomById(roomId);
        const hotel = await this.getHotelById(hotelId);
        if (hotel.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only delete rooms from your own hotel');
        }
        await this.roomModel.findByIdAndDelete(roomId);
    }
    async toggleRoomActive(roomId, hotelId, managerId, isActive) {
        const room = await this.getRoomById(roomId);
        const hotel = await this.getHotelById(hotelId);
        if (hotel.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only toggle rooms in your own hotel');
        }
        return this.roomModel.findByIdAndUpdate(roomId, { isActive }, { new: true });
    }
};
exports.HotelsService = HotelsService;
exports.HotelsService = HotelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(hotel_schema_1.Hotel.name)),
    __param(1, (0, mongoose_1.InjectModel)(hotel_room_schema_1.HotelRoom.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], HotelsService);
//# sourceMappingURL=hotels.service.js.map