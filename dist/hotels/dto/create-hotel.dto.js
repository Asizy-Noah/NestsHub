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
exports.UpdateHotelDto = exports.CreateHotelDto = exports.CreateHotelAmenitiesDto = void 0;
const class_validator_1 = require("class-validator");
const hotel_schema_1 = require("../schemas/hotel.schema");
class CreateHotelAmenitiesDto {
}
exports.CreateHotelAmenitiesDto = CreateHotelAmenitiesDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHotelAmenitiesDto.prototype, "gym", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHotelAmenitiesDto.prototype, "bar", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHotelAmenitiesDto.prototype, "restaurant", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHotelAmenitiesDto.prototype, "parkingSpace", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHotelAmenitiesDto.prototype, "storageBuilding", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHotelAmenitiesDto.prototype, "supermarketNearby", void 0);
class CreateHotelDto {
}
exports.CreateHotelDto = CreateHotelDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "telephone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "whatsapp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "district", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "townOrCity", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "street", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['on_the_road', 'less_500m', '500m_1km', '1km_5km', '5km_plus']),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "distanceToMainRoad", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "coverPhoto", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateHotelDto.prototype, "gallery", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CreateHotelAmenitiesDto)
], CreateHotelDto.prototype, "amenities", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(hotel_schema_1.ConnectivityType),
    __metadata("design:type", String)
], CreateHotelDto.prototype, "wifiStatus", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(hotel_schema_1.PaymentMethod, { each: true }),
    __metadata("design:type", Array)
], CreateHotelDto.prototype, "paymentMethods", void 0);
class UpdateHotelDto extends CreateHotelDto {
}
exports.UpdateHotelDto = UpdateHotelDto;
//# sourceMappingURL=create-hotel.dto.js.map