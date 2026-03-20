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
exports.RoomSchema = exports.Room = exports.CookingPolicy = exports.RoomType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var RoomType;
(function (RoomType) {
    RoomType["SINGLE"] = "single";
    RoomType["DOUBLE"] = "double";
    RoomType["TRIPLE"] = "triple";
    RoomType["DORMITORY"] = "dormitory";
})(RoomType || (exports.RoomType = RoomType = {}));
var CookingPolicy;
(function (CookingPolicy) {
    CookingPolicy["ELECTRICITY"] = "electricity";
    CookingPolicy["CHARCOAL"] = "charcoal";
    CookingPolicy["GAS"] = "gas";
    CookingPolicy["NOT_ALLOWED"] = "not_allowed";
})(CookingPolicy || (exports.CookingPolicy = CookingPolicy = {}));
let Room = class Room extends mongoose_2.Document {
};
exports.Room = Room;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Hostel', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Room.prototype, "hostelId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(RoomType), required: true }),
    __metadata("design:type", String)
], Room.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Room.prototype, "roomNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Room.prototype, "floor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Room.prototype, "isSelfContained", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(CookingPolicy), default: CookingPolicy.NOT_ALLOWED }),
    __metadata("design:type", String)
], Room.prototype, "cookingPolicy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Room.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Room.prototype, "pricePerMonth", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Room.prototype, "capacity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Room.prototype, "isAvailable", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Room.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Room.prototype, "amenities", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Room.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Room.prototype, "updatedAt", void 0);
exports.Room = Room = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Room);
exports.RoomSchema = mongoose_1.SchemaFactory.createForClass(Room);
exports.RoomSchema.index({ hostelId: 1 });
exports.RoomSchema.index({ type: 1 });
exports.RoomSchema.index({ isAvailable: 1 });
exports.RoomSchema.index({ createdAt: -1 });
//# sourceMappingURL=room.schema.js.map