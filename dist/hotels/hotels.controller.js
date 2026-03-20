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
exports.HotelsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const hotels_service_1 = require("./hotels.service");
const create_hotel_dto_1 = require("./dto/create-hotel.dto");
const create_hotel_room_dto_1 = require("./dto/create-hotel-room.dto");
let HotelsController = class HotelsController {
    constructor(hotelsService) {
        this.hotelsService = hotelsService;
    }
    async createHotel(req, createHotelDto) {
        return this.hotelsService.createHotel(req.user.sub, createHotelDto);
    }
    async getMyHotel(req) {
        return this.hotelsService.getHotelByManager(req.user.sub);
    }
    async getHotelById(id) {
        return this.hotelsService.getHotelById(id);
    }
    async updateHotel(id, req, updateHotelDto) {
        return this.hotelsService.updateHotel(id, req.user.sub, updateHotelDto);
    }
    async updateAmenities(id, req, amenities) {
        return this.hotelsService.updateHotelAmenities(id, req.user.sub, amenities);
    }
    async applyForVerification(id, req) {
        return this.hotelsService.applyForVerification(id, req.user.sub);
    }
    async toggleActive(id, req, body) {
        return this.hotelsService.toggleHotelActive(id, req.user.sub, body.isActive);
    }
    async searchHotels(query, district, townOrCity, verified) {
        const isVerified = verified === 'true' ? true : verified === 'false' ? false : undefined;
        return this.hotelsService.searchHotels(query || '', district, townOrCity, isVerified);
    }
    async getVerifiedHotels() {
        return this.hotelsService.getVerifiedHotels();
    }
    async getDashboardStats(req) {
        return this.hotelsService.getDashboardStats(req.user.sub);
    }
    async createRoom(hotelId, req, createRoomDto) {
        return this.hotelsService.createRoom(hotelId, req.user.sub, createRoomDto);
    }
    async getRoomsByHotel(hotelId) {
        return this.hotelsService.getRoomsByHotel(hotelId);
    }
    async getRoomById(roomId) {
        return this.hotelsService.getRoomById(roomId);
    }
    async updateRoom(hotelId, roomId, req, updateRoomDto) {
        return this.hotelsService.updateRoom(roomId, hotelId, req.user.sub, updateRoomDto);
    }
    async updateRoomInventory(hotelId, roomId, req, inventoryDto) {
        return this.hotelsService.updateRoomInventory(roomId, hotelId, req.user.sub, inventoryDto);
    }
    async deleteRoom(hotelId, roomId, req) {
        return this.hotelsService.deleteRoom(roomId, hotelId, req.user.sub);
    }
    async toggleRoomActive(hotelId, roomId, req, body) {
        return this.hotelsService.toggleRoomActive(roomId, hotelId, req.user.sub, body.isActive);
    }
};
exports.HotelsController = HotelsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_hotel_dto_1.CreateHotelDto]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "createHotel", null);
__decorate([
    (0, common_1.Get)('my-hotel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getMyHotel", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getHotelById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_hotel_dto_1.UpdateHotelDto]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "updateHotel", null);
__decorate([
    (0, common_1.Put)(':id/amenities'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "updateAmenities", null);
__decorate([
    (0, common_1.Post)(':id/apply-verification'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "applyForVerification", null);
__decorate([
    (0, common_1.Put)(':id/toggle-active'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "toggleActive", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('district')),
    __param(2, (0, common_1.Query)('town')),
    __param(3, (0, common_1.Query)('verified')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "searchHotels", null);
__decorate([
    (0, common_1.Get)('verified/list'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getVerifiedHotels", null);
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Post)(':hotelId/rooms'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('hotelId')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_hotel_room_dto_1.CreateHotelRoomDto]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Get)(':hotelId/rooms'),
    __param(0, (0, common_1.Param)('hotelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getRoomsByHotel", null);
__decorate([
    (0, common_1.Get)('rooms/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getRoomById", null);
__decorate([
    (0, common_1.Put)(':hotelId/rooms/:roomId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('hotelId')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, create_hotel_room_dto_1.UpdateHotelRoomDto]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Put)(':hotelId/rooms/:roomId/inventory'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('hotelId')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, create_hotel_room_dto_1.UpdateRoomInventoryDto]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "updateRoomInventory", null);
__decorate([
    (0, common_1.Delete)(':hotelId/rooms/:roomId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('hotelId')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "deleteRoom", null);
__decorate([
    (0, common_1.Put)(':hotelId/rooms/:roomId/toggle-active'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('hotelId')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "toggleRoomActive", null);
exports.HotelsController = HotelsController = __decorate([
    (0, common_1.Controller)('api/hotels'),
    __metadata("design:paramtypes", [hotels_service_1.HotelsService])
], HotelsController);
//# sourceMappingURL=hotels.controller.js.map