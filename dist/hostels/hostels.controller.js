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
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const account_schema_1 = require("../accounts/schemas/account.schema");
let HostelsController = class HostelsController {
    constructor(hostelsService) {
        this.hostelsService = hostelsService;
    }
    async getDashboard(req) {
        const managerId = req.user.userId;
        const hostelData = await this.hostelsService.getHostelDataByManager(managerId);
        return {
            title: 'Hostel Manager Dashboard',
            layout: 'layouts/hostel',
            manager: req.user,
            hostelData: JSON.stringify(hostelData)
        };
    }
    async updateHostel(req, data) {
        return await this.hostelsService.updateHostel(req.user.userId, data);
    }
    async applyForVerification(req) {
        return await this.hostelsService.applyVerification(req.user.userId);
    }
    async addRoom(req, roomData) {
        return await this.hostelsService.addRoom(req.user.userId, roomData);
    }
    async updateRoom(req, roomId, roomData) {
        return await this.hostelsService.updateRoom(roomId, req.user.userId, roomData);
    }
    async updateRoomQuantity(req, roomId, change) {
        return await this.hostelsService.updateRoomQuantity(roomId, req.user.userId, change);
    }
    async deleteRoom(req, roomId) {
        return await this.hostelsService.deleteRoom(roomId, req.user.userId);
    }
};
exports.HostelsController = HostelsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('hostels/dashboard'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "updateHostel", null);
__decorate([
    (0, common_1.Patch)('verify'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "applyForVerification", null);
__decorate([
    (0, common_1.Post)('rooms'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "addRoom", null);
__decorate([
    (0, common_1.Patch)('rooms/:roomId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.Patch)('rooms/:roomId/quantity'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Body)('change')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "updateRoomQuantity", null);
__decorate([
    (0, common_1.Delete)('rooms/:roomId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HostelsController.prototype, "deleteRoom", null);
exports.HostelsController = HostelsController = __decorate([
    (0, common_1.Controller)('dashboard/hostel'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_schema_1.AccountRole.HOSTEL_MANAGER),
    __metadata("design:paramtypes", [hostels_service_1.HostelsService])
], HostelsController);
//# sourceMappingURL=hostels.controller.js.map