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
exports.RentalsController = void 0;
const common_1 = require("@nestjs/common");
const rentals_service_1 = require("./rentals.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const account_schema_1 = require("../accounts/schemas/account.schema");
let RentalsController = class RentalsController {
    constructor(rentalsService) {
        this.rentalsService = rentalsService;
    }
    async getDashboard(req) {
        const data = await this.rentalsService.getDashboardData(req.user.userId);
        return { title: 'Rental Dashboard', layout: 'layouts/rental', manager: req.user, rentalData: JSON.stringify(data) };
    }
    async getProfileView(req) {
        const profile = await this.rentalsService.getProfile(req.user.userId);
        return { title: 'Manager Profile', layout: 'layouts/rental', manager: req.user, user: profile };
    }
    getReviewsView(req) {
        return { title: 'Public Reviews', layout: 'layouts/rental', manager: req.user };
    }
    async updateProfile(req, data) {
        return await this.rentalsService.updateProfile(req.user.userId, data);
    }
    async addRental(req, data) {
        return await this.rentalsService.addRental(req.user.userId, data);
    }
    async updateRental(req, id, data) {
        return await this.rentalsService.updateRental(id, req.user.userId, data);
    }
    async deleteRental(req, id) {
        return await this.rentalsService.deleteRental(id, req.user.userId);
    }
    async updateQuantity(req, id, change) {
        return await this.rentalsService.updateUnitQuantity(id, req.user.userId, change);
    }
};
exports.RentalsController = RentalsController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Render)('rentals/dashboard'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.Render)('rentals/profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "getProfileView", null);
__decorate([
    (0, common_1.Get)('reviews'),
    (0, common_1.Render)('rentals/reviews'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RentalsController.prototype, "getReviewsView", null);
__decorate([
    (0, common_1.Patch)('profile/update'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "addRental", null);
__decorate([
    (0, common_1.Patch)('items/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "updateRental", null);
__decorate([
    (0, common_1.Delete)('items/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "deleteRental", null);
__decorate([
    (0, common_1.Patch)('items/:id/quantity'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)('change')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "updateQuantity", null);
exports.RentalsController = RentalsController = __decorate([
    (0, common_1.Controller)('dashboard/rentals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(account_schema_1.AccountRole.PROPERTY_MANAGER),
    __metadata("design:paramtypes", [rentals_service_1.RentalsService])
], RentalsController);
//# sourceMappingURL=rentals.controller.js.map