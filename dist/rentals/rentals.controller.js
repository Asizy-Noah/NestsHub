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
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const rentals_service_1 = require("./rentals.service");
const create_rental_dto_1 = require("./dto/create-rental.dto");
let RentalsController = class RentalsController {
    constructor(rentalsService) {
        this.rentalsService = rentalsService;
    }
    async createRental(req, createRentalDto) {
        if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
            throw new common_1.BadRequestException('Only property owners and brokers can create rentals');
        }
        return this.rentalsService.createRental(req.user.id, createRentalDto);
    }
    async getMyRentals(req, limit = 10, offset = 0) {
        if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
            throw new common_1.BadRequestException('Access denied');
        }
        return this.rentalsService.getRentalsByManager(req.user.id, limit, offset);
    }
    async getDashboardStats(req) {
        if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
            throw new common_1.BadRequestException('Access denied');
        }
        return this.rentalsService.getDashboardStats(req.user.id);
    }
    async searchRentals(query, houseType, city, town, verified, limit = 20, offset = 0) {
        return this.rentalsService.searchRentals(query, houseType, city, town, verified, limit, offset);
    }
    async getVerifiedRentals(limit = 20, offset = 0) {
        return this.rentalsService.getVerifiedRentals(limit, offset);
    }
    async getRentalById(id) {
        return this.rentalsService.getRentalById(id);
    }
    async updateRental(id, req, updateRentalDto) {
        if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
            throw new common_1.BadRequestException('Access denied');
        }
        return this.rentalsService.updateRental(id, req.user.id, updateRentalDto);
    }
    async deleteRental(id, req) {
        if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
            throw new common_1.BadRequestException('Access denied');
        }
        await this.rentalsService.deleteRental(id, req.user.id);
        return { message: 'Rental property deleted successfully' };
    }
    async toggleRentalActive(id, req, body) {
        if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
            throw new common_1.BadRequestException('Access denied');
        }
        return this.rentalsService.toggleRentalActive(id, req.user.id, body.isActive);
    }
    async applyForVerification(id, req) {
        if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
            throw new common_1.BadRequestException('Access denied');
        }
        return this.rentalsService.applyForVerification(id, req.user.id);
    }
    async uploadVerificationProof(id, req, body) {
        if (!['PROPERTY_OWNER', 'PROPERTY_BROKER'].includes(req.user.role)) {
            throw new common_1.BadRequestException('Access denied');
        }
        return this.rentalsService.uploadVerificationProof(id, req.user.id, body.proofUrl);
    }
};
exports.RentalsController = RentalsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_rental_dto_1.CreateRentalDto]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "createRental", null);
__decorate([
    (0, common_1.Get)('my-properties'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "getMyRentals", null);
__decorate([
    (0, common_1.Get)('dashboard/stats'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "getDashboardStats", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('city')),
    __param(3, (0, common_1.Query)('town')),
    __param(4, (0, common_1.Query)('verified')),
    __param(5, (0, common_1.Query)('limit')),
    __param(6, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Boolean, Number, Number]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "searchRentals", null);
__decorate([
    (0, common_1.Get)('verified'),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "getVerifiedRentals", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "getRentalById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, create_rental_dto_1.UpdateRentalDto]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "updateRental", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "deleteRental", null);
__decorate([
    (0, common_1.Put)(':id/active'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "toggleRentalActive", null);
__decorate([
    (0, common_1.Post)(':id/apply-verification'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "applyForVerification", null);
__decorate([
    (0, common_1.Post)(':id/upload-proof'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], RentalsController.prototype, "uploadVerificationProof", null);
exports.RentalsController = RentalsController = __decorate([
    (0, common_1.Controller)('api/rentals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [rentals_service_1.RentalsService])
], RentalsController);
//# sourceMappingURL=rentals.controller.js.map