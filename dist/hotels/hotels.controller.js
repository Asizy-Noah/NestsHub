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
const hotels_service_1 = require("./hotels.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const account_schema_1 = require("../accounts/schemas/account.schema");
let HotelsController = class HotelsController {
    constructor(hotelsService) {
        this.hotelsService = hotelsService;
    }
    async getDashboard(req) {
        const hotelData = await this.hotelsService.getHotelDataByManager(req.user.userId);
        return { title: 'Hotel Dashboard', layout: 'layouts/hotel', manager: req.user, hotelData: JSON.stringify(hotelData) };
    }
    async updateHotel(req, data) {
        return await this.hotelsService.updateHotel(req.user.userId, data);
    }
    async applyForVerification(req) {
        return await this.hotelsService.applyVerification(req.user.userId);
    }
    async addRoom(req, roomData) {
        return await this.hotelsService.addRoom(req.user.userId, roomData);
    }
    async updateRoom(req, roomId, roomData) {
        return await this.hotelsService.updateRoom(roomId, req.user.userId, roomData);
    }
    async deleteRoom(req, roomId) {
        return await this.hotelsService.deleteRoom(roomId, req.user.userId);
    }
    async updateRoomQuantity(req, roomId, change) {
        return await this.hotelsService.updateRoomQuantity(roomId, req.user.userId, change);
    }
    async getProfileView(req) {
        const account = await this.hotelsService.getManagerAccount(req.user.userId);
        return { title: 'Manager Profile', layout: 'layouts/hotel', manager: req.user, account: JSON.stringify(account) };
    }
    getReviewsView(req) {
        return { title: 'Hotel Reviews', layout: 'layouts/hotel', manager: req.user };
    }
};
exports.HotelsController = HotelsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_schema_1.AccountRole.HOTEL_MANAGER),
    (0, common_1.Render)('hotels/dashboard'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_schema_1.AccountRole.HOTEL_MANAGER),
    (0, common_1.Patch)('update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "updateHotel", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_schema_1.AccountRole.HOTEL_MANAGER),
    (0, common_1.Patch)('verify'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "applyForVerification", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_schema_1.AccountRole.HOTEL_MANAGER),
    (0, common_1.Post)('rooms'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "addRoom", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_schema_1.AccountRole.HOTEL_MANAGER),
    (0, common_1.Patch)('rooms/:roomId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "updateRoom", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_schema_1.AccountRole.HOTEL_MANAGER),
    (0, common_1.Delete)('rooms/:roomId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('roomId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "deleteRoom", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_schema_1.AccountRole.HOTEL_MANAGER),
    (0, common_1.Patch)('rooms/:roomId/quantity'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('roomId')),
    __param(2, (0, common_1.Body)('change')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "updateRoomQuantity", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_schema_1.AccountRole.HOTEL_MANAGER),
    (0, common_1.Render)('hotels/profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], HotelsController.prototype, "getProfileView", null);
__decorate([
    (0, common_1.Get)('reviews'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_schema_1.AccountRole.HOTEL_MANAGER),
    (0, common_1.Render)('hotels/reviews'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HotelsController.prototype, "getReviewsView", null);
exports.HotelsController = HotelsController = __decorate([
    (0, common_1.Controller)('dashboard/hotel'),
    __metadata("design:paramtypes", [hotels_service_1.HotelsService])
], HotelsController);
//# sourceMappingURL=hotels.controller.js.map