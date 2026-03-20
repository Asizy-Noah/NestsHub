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
exports.HostelsController = void 0;
const common_1 = require("@nestjs/common");
const hostels_service_1 = require("./hostels.service");
const create_hostel_dto_1 = require("./dto/create-hostel.dto");
const create_room_dto_1 = require("./dto/create-room.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let HostelsController = class HostelsController {
    constructor(hostelService) {
        this.hostelService = hostelService;
    }
    getHostelDashboard() {
        return { title: 'Hostel Dashboard' };
    }
    async createHostel(req, createHostelDto) {
        return this.hostelService.createHostel(req.user.sub, createHostelDto);
    }
    async getMyHostel(req) {
        return this.hostelService.findHostelByManager(req.user.sub);
    }
    async searchHostels(query, skip = 0, limit = 10) {
        return this.hostelService.searchHostels(query, skip, limit);
    }
    async getVerifiedHostels(skip = 0, limit = 10) {
        return this.hostelService.getVerifiedHostels(skip, limit);
    }
    async getHostelStats(req) {
        return this.hostelService.getHostelStats(req.user.sub);
    }
    async getHostelById(id) {
        return this.hostelService.findHostelById(id);
    }
    async updateHostel(id, req, updateHostelDto) {
        return this.hostelService.updateHostel(id, req.user.sub, updateHostelDto);
    }
    async applyVerification(id, req, applyVerificationDto) {
        return this.hostelService.applyVerification(id, req.user.sub, applyVerificationDto);
    }
    async createRoom(hostelId, req, createRoomDto) {
        return this.hostelService.createRoom(hostelId, req.user.sub, createRoomDto);
    }
    async getRoomsByHostel(hostelId) {
        return this.hostelService.getRoomsByHostel(hostelId);
    }
    async getRoomById(roomId) {
        return this.hostelService.getRoomById(roomId);
    }
    async updateRoom(hostelId, roomId, req, updateRoomDto) {
        return this.hostelService.updateRoom(roomId, hostelId, req.user.sub, updateRoomDto);
    }
    async deleteRoom(hostelId, roomId, req) {
        await this.hostelService.deleteRoom(roomId, hostelId, req.user.sub);
        return { message: 'Room deleted successfully' };
    }
};
exports.HostelsController = HostelsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('hostels/dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HostelsController.prototype, "getHostelDashboard", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_hostel_dto_1.CreateHostelDto]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "createHostel", null);
__decorate([
    (0, common_1.Get)('my-hostel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "getMyHostel", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "searchHostels", null);
__decorate([
    (0, common_1.Get)('verified'),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "getVerifiedHostels", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "getHostelStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "getHostelById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_hostel_dto_1.UpdateHostelDto]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "updateHostel", null);
__decorate([
    (0, common_1.Post)(':id/apply-verification'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_hostel_dto_1.ApplyVerificationDto]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "applyVerification", null);
__decorate([
    (0, common_1.Post)(':hostelId/rooms'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('hostelId')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_room_dto_1.CreateRoomDto]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "createRoom", null);
__decorate([
    (0, common_1.Get)(':hostelId/rooms'),
    __param(0, (0, common_1.Param)('hostelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "getRoomsByHostel", null);
__decorate([
    (0, common_1.Get)(':hostelId/rooms/:roomId'),
    __param(0, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "getRoomById", null);
__decorate([
    (0, common_1.Put)(':hostelId/rooms/:roomId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('hostelId')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, create_room_dto_1.UpdateRoomDto]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Delete)(':hostelId/rooms/:roomId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('hostelId')),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "deleteRoom", null);
exports.HostelsController = HostelsController = __decorate([
    (0, common_1.Controller)('dashboard/hostels'),
    __metadata("design:paramtypes", [hostels_service_1.HostelsService])
], HostelsController);
//# sourceMappingURL=hostels.controller.js.map