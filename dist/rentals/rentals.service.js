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
exports.RentalsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const rental_property_schema_1 = require("./schemas/rental-property.schema");
let RentalsService = class RentalsService {
    constructor(rentalPropertyModel) {
        this.rentalPropertyModel = rentalPropertyModel;
    }
    async createRental(managerId, createRentalDto) {
        const rental = new this.rentalPropertyModel({
            ...createRentalDto,
            managerId,
            verificationStatus: rental_property_schema_1.VerificationStatus.UNVERIFIED,
        });
        return rental.save();
    }
    async getRentalById(id) {
        const rental = await this.rentalPropertyModel.findById(id).populate('managerId');
        if (!rental) {
            throw new common_1.NotFoundException('Rental property not found');
        }
        return rental;
    }
    async getRentalsByManager(managerId, limit = 10, offset = 0) {
        const total = await this.rentalPropertyModel.countDocuments({ managerId });
        const rentals = await this.rentalPropertyModel
            .find({ managerId })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset);
        return { rentals, total };
    }
    async updateRental(rentalId, managerId, updateRentalDto) {
        const rental = await this.getRentalById(rentalId);
        if (rental.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only update your own rental properties');
        }
        return this.rentalPropertyModel.findByIdAndUpdate(rentalId, updateRentalDto, {
            new: true,
            runValidators: true,
        });
    }
    async deleteRental(rentalId, managerId) {
        const rental = await this.getRentalById(rentalId);
        if (rental.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only delete your own rental properties');
        }
        await this.rentalPropertyModel.findByIdAndDelete(rentalId);
    }
    async toggleRentalActive(rentalId, managerId, isActive) {
        const rental = await this.getRentalById(rentalId);
        if (rental.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only toggle your own rental properties');
        }
        return this.rentalPropertyModel.findByIdAndUpdate(rentalId, { isActive }, { new: true });
    }
    async applyForVerification(rentalId, managerId) {
        const rental = await this.getRentalById(rentalId);
        if (rental.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only apply for your own properties');
        }
        if (rental.verificationStatus === rental_property_schema_1.VerificationStatus.PENDING) {
            throw new common_1.BadRequestException('Verification application already pending');
        }
        if (rental.verificationStatus === rental_property_schema_1.VerificationStatus.VERIFIED) {
            throw new common_1.BadRequestException('Property is already verified');
        }
        return this.rentalPropertyModel.findByIdAndUpdate(rentalId, {
            verificationStatus: rental_property_schema_1.VerificationStatus.PENDING,
            verificationAppliedAt: new Date(),
        }, { new: true });
    }
    async uploadVerificationProof(rentalId, managerId, proofUrl) {
        const rental = await this.getRentalById(rentalId);
        if (rental.managerId.toString() !== managerId) {
            throw new common_1.ForbiddenException('You can only upload proof for your own properties');
        }
        return this.rentalPropertyModel.findByIdAndUpdate(rentalId, {
            verificationProofUrl: proofUrl,
        }, { new: true });
    }
    async searchRentals(query, houseType, city, town, verified, limit = 20, offset = 0) {
        const filters = { isActive: true };
        if (query) {
            filters.$or = [
                { propertyName: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { nearestRoad: { $regex: query, $options: 'i' } },
            ];
        }
        if (houseType)
            filters.houseType = houseType;
        if (city)
            filters.nearestCity = { $regex: city, $options: 'i' };
        if (town)
            filters.nearestTown = { $regex: town, $options: 'i' };
        if (verified !== undefined) {
            filters.verificationStatus = verified
                ? rental_property_schema_1.VerificationStatus.VERIFIED
                : { $ne: rental_property_schema_1.VerificationStatus.VERIFIED };
        }
        const total = await this.rentalPropertyModel.countDocuments(filters);
        const rentals = await this.rentalPropertyModel
            .find(filters)
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset)
            .populate('managerId', 'firstName lastName email telephone');
        return { rentals, total };
    }
    async getVerifiedRentals(limit = 20, offset = 0) {
        const total = await this.rentalPropertyModel.countDocuments({
            verificationStatus: rental_property_schema_1.VerificationStatus.VERIFIED,
            isActive: true,
        });
        const rentals = await this.rentalPropertyModel
            .find({
            verificationStatus: rental_property_schema_1.VerificationStatus.VERIFIED,
            isActive: true,
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset)
            .populate('managerId', 'firstName lastName email telephone');
        return { rentals, total };
    }
    async getDashboardStats(managerId) {
        const totalProperties = await this.rentalPropertyModel.countDocuments({ managerId });
        const verifiedCount = await this.rentalPropertyModel.countDocuments({
            managerId,
            verificationStatus: rental_property_schema_1.VerificationStatus.VERIFIED,
        });
        const pendingVerificationCount = await this.rentalPropertyModel.countDocuments({
            managerId,
            verificationStatus: rental_property_schema_1.VerificationStatus.PENDING,
        });
        const activeCount = await this.rentalPropertyModel.countDocuments({
            managerId,
            isActive: true,
        });
        const propertyTypes = await this.rentalPropertyModel.aggregate([
            { $match: { managerId: new mongoose_2.Types.ObjectId(managerId) } },
            { $group: { _id: '$houseType', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        const recentProperties = await this.rentalPropertyModel
            .find({ managerId })
            .sort({ createdAt: -1 })
            .limit(5);
        return {
            overview: {
                totalProperties,
                verifiedCount,
                pendingVerificationCount,
                activeCount,
            },
            propertyTypes,
            recentProperties,
        };
    }
};
exports.RentalsService = RentalsService;
exports.RentalsService = RentalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rental_property_schema_1.RentalProperty.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RentalsService);
//# sourceMappingURL=rentals.service.js.map