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
exports.HotelRoomSchema = exports.HotelRoom = exports.RoomAmenities = exports.BedSize = exports.RoomType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var RoomType;
(function (RoomType) {
    RoomType["SINGLE"] = "single";
    RoomType["DOUBLE"] = "double";
    RoomType["SUITE"] = "suite";
})(RoomType || (exports.RoomType = RoomType = {}));
var BedSize;
(function (BedSize) {
    BedSize["THREE_BY_SIX"] = "3x6";
    BedSize["FOUR_BY_SIX"] = "4x6";
    BedSize["SIX_BY_SIX"] = "6x6";
})(BedSize || (exports.BedSize = BedSize = {}));
let RoomAmenities = class RoomAmenities extends mongoose_2.Document {
};
exports.RoomAmenities = RoomAmenities;
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RoomAmenities.prototype, "hasBalcony", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RoomAmenities.prototype, "hasHotWater", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RoomAmenities.prototype, "hasTV", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RoomAmenities.prototype, "hasDSTV", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RoomAmenities.prototype, "hasTableChair", void 0);
exports.RoomAmenities = RoomAmenities = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], RoomAmenities);
const RoomAmenitiesSchema = mongoose_1.SchemaFactory.createForClass(RoomAmenities);
let HotelRoom = class HotelRoom extends mongoose_2.Document {
    get availableRooms() {
        return this.totalRooms - this.bookedRooms;
    }
};
exports.HotelRoom = HotelRoom;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Hotel', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], HotelRoom.prototype, "hotelId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], HotelRoom.prototype, "photo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(RoomType),
        required: true
    }),
    __metadata("design:type", String)
], HotelRoom.prototype, "roomType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], HotelRoom.prototype, "isSelfContained", void 0);
__decorate([
    (0, mongoose_1.Prop)({ min: 0, max: 10, default: 1 }),
    __metadata("design:type", Number)
], HotelRoom.prototype, "floor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: RoomAmenitiesSchema }),
    __metadata("design:type", RoomAmenities)
], HotelRoom.prototype, "amenities", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(BedSize),
        required: true
    }),
    __metadata("design:type", String)
], HotelRoom.prototype, "bedSize", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], HotelRoom.prototype, "costPerNight", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], HotelRoom.prototype, "breakfastIncluded", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], HotelRoom.prototype, "totalRooms", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, min: 0 }),
    __metadata("design:type", Number)
], HotelRoom.prototype, "bookedRooms", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], HotelRoom.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], HotelRoom.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], HotelRoom.prototype, "updatedAt", void 0);
exports.HotelRoom = HotelRoom = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], HotelRoom);
exports.HotelRoomSchema = mongoose_1.SchemaFactory.createForClass(HotelRoom);
exports.HotelRoomSchema.index({ hotelId: 1 });
exports.HotelRoomSchema.index({ roomType: 1 });
exports.HotelRoomSchema.index({ createdAt: -1 });
//# sourceMappingURL=hotel-room.schema.js.map