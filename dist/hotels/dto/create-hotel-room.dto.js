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
exports.UpdateRoomInventoryDto = exports.UpdateHotelRoomDto = exports.CreateHotelRoomDto = exports.CreateRoomAmenitiesDto = void 0;
const class_validator_1 = require("class-validator");
const hotel_room_schema_1 = require("../schemas/hotel-room.schema");
class CreateRoomAmenitiesDto {
}
exports.CreateRoomAmenitiesDto = CreateRoomAmenitiesDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRoomAmenitiesDto.prototype, "hasBalcony", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRoomAmenitiesDto.prototype, "hasHotWater", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRoomAmenitiesDto.prototype, "hasTV", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRoomAmenitiesDto.prototype, "hasDSTV", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRoomAmenitiesDto.prototype, "hasTableChair", void 0);
class CreateHotelRoomDto {
}
exports.CreateHotelRoomDto = CreateHotelRoomDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateHotelRoomDto.prototype, "photo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(hotel_room_schema_1.RoomType),
    __metadata("design:type", String)
], CreateHotelRoomDto.prototype, "roomType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHotelRoomDto.prototype, "isSelfContained", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", Number)
], CreateHotelRoomDto.prototype, "floor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", CreateRoomAmenitiesDto)
], CreateHotelRoomDto.prototype, "amenities", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(hotel_room_schema_1.BedSize),
    __metadata("design:type", String)
], CreateHotelRoomDto.prototype, "bedSize", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateHotelRoomDto.prototype, "costPerNight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateHotelRoomDto.prototype, "breakfastIncluded", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateHotelRoomDto.prototype, "totalRooms", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateHotelRoomDto.prototype, "bookedRooms", void 0);
class UpdateHotelRoomDto extends CreateHotelRoomDto {
}
exports.UpdateHotelRoomDto = UpdateHotelRoomDto;
class UpdateRoomInventoryDto {
}
exports.UpdateRoomInventoryDto = UpdateRoomInventoryDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateRoomInventoryDto.prototype, "bookedRooms", void 0);
//# sourceMappingURL=create-hotel-room.dto.js.map