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
const rental_profile_schema_1 = require("./schemas/rental-profile.schema");
let RentalsService = class RentalsService {
    constructor(rentalModel, profileModel) {
        this.rentalModel = rentalModel;
        this.profileModel = profileModel;
    }
    async getDashboardData(managerId) {
        const rentals = await this.rentalModel.find({ managerId });
        return { rentals };
    }
    async getProfile(managerId) {
        let profile = await this.profileModel.findOne({ managerId });
        if (!profile) {
            profile = await this.profileModel.create({ managerId });
        }
        return profile;
    }
    async updateProfile(managerId, data) {
        return await this.profileModel.findOneAndUpdate({ managerId }, { $set: data }, { new: true, upsert: true });
    }
    async addRental(managerId, data) {
        const newRental = new this.rentalModel({ ...data, managerId, availableUnits: data.totalUnits });
        return await newRental.save();
    }
    async updateRental(rentalId, managerId, data) {
        const { _id, managerId: mid, ...updateData } = data;
        if (updateData.totalUnits < updateData.availableUnits) {
            updateData.availableUnits = updateData.totalUnits;
        }
        const updated = await this.rentalModel.findOneAndUpdate({ _id: rentalId, managerId }, { $set: updateData }, { new: true });
        if (!updated)
            throw new common_1.NotFoundException('Rental not found');
        return updated;
    }
    async deleteRental(rentalId, managerId) {
        const result = await this.rentalModel.findOneAndDelete({ _id: rentalId, managerId });
        if (!result)
            throw new common_1.NotFoundException('Rental not found');
        return { success: true };
    }
    async updateUnitQuantity(rentalId, managerId, change) {
        const rental = await this.rentalModel.findOne({ _id: rentalId, managerId });
        if (!rental)
            throw new common_1.NotFoundException('Rental not found');
        const newAvail = rental.availableUnits + change;
        if (newAvail < 0 || newAvail > rental.totalUnits)
            throw new common_1.BadRequestException('Invalid quantity');
        rental.availableUnits = newAvail;
        return await rental.save();
    }
};
exports.RentalsService = RentalsService;
exports.RentalsService = RentalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(rental_property_schema_1.RentalProperty.name)),
    __param(1, (0, mongoose_1.InjectModel)(rental_profile_schema_1.RentalProfile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], RentalsService);
//# sourceMappingURL=rentals.service.js.map