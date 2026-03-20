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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRentalDto = exports.CreateRentalDto = void 0;
const class_validator_1 = require("class-validator");
const rental_property_schema_1 = require("../schemas/rental-property.schema");
class CreateRentalDto {
}
exports.CreateRentalDto = CreateRentalDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "propertyName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(rental_property_schema_1.HouseType),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "houseType", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(rental_property_schema_1.BuildingStyle),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "buildingStyle", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateRentalDto.prototype, "unitCount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRentalDto.prototype, "monthlyRent", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRentalDto.prototype, "isSelfContained", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRentalDto.prototype, "isFenced", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRentalDto.prototype, "isCompoundPaved", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRentalDto.prototype, "hasAmpleParking", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRentalDto.prototype, "hasOutsideWashrooms", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRentalDto.prototype, "hasSecurity", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRentalDto.prototype, "hasWater", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRentalDto.prototype, "isFurnished", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateRentalDto.prototype, "furnitureList", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(rental_property_schema_1.BillingPayer),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "waterBillPaidBy", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(rental_property_schema_1.BillingPayer),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "electricityBillPaidBy", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(rental_property_schema_1.BillingPayer),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "securityFeePaidBy", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "nearestTown", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "nearestCity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "nearestRoad", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(rental_property_schema_1.AccessRoadType),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "accessRoadType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRentalDto.prototype, "distanceToTarmac", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "distanceToGym", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "distanceToSupermarket", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "distanceToGroceries", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "shoppingCenterName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "contactPerson", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "telephone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "whatsapp", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateRentalDto.prototype, "email", void 0);
class UpdateRentalDto extends CreateRentalDto {
}
exports.UpdateRentalDto = UpdateRentalDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRentalDto.prototype, "coverPhoto", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateRentalDto.prototype, "gallery", void 0);
//# sourceMappingURL=create-rental.dto.js.map