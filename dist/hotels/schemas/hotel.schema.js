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
exports.HotelSchema = exports.Hotel = exports.HotelAmenities = exports.VerificationStatus = exports.PaymentMethod = exports.ConnectivityType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var ConnectivityType;
(function (ConnectivityType) {
    ConnectivityType["FREE"] = "free";
    ConnectivityType["EXTRA_CHARGE"] = "extra_charge";
    ConnectivityType["NONE"] = "none";
})(ConnectivityType || (exports.ConnectivityType = ConnectivityType = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "cash";
    PaymentMethod["MOBILE_MONEY"] = "mobile_money";
    PaymentMethod["VISA"] = "visa";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["UNVERIFIED"] = "unverified";
    VerificationStatus["PENDING"] = "pending";
    VerificationStatus["VERIFIED"] = "verified";
    VerificationStatus["REJECTED"] = "rejected";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
let HotelAmenities = class HotelAmenities extends mongoose_2.Document {
};
exports.HotelAmenities = HotelAmenities;
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], HotelAmenities.prototype, "gym", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], HotelAmenities.prototype, "bar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], HotelAmenities.prototype, "restaurant", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], HotelAmenities.prototype, "parkingSpace", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], HotelAmenities.prototype, "storageBuilding", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], HotelAmenities.prototype, "supermarketNearby", void 0);
exports.HotelAmenities = HotelAmenities = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], HotelAmenities);
const HotelAmenitiesSchema = mongoose_1.SchemaFactory.createForClass(HotelAmenities);
let Hotel = class Hotel extends mongoose_2.Document {
};
exports.Hotel = Hotel;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Account', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Hotel.prototype, "managerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hotel.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hotel.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hotel.prototype, "telephone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Hotel.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hotel.prototype, "whatsapp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hotel.prototype, "district", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hotel.prototype, "townOrCity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hotel.prototype, "street", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ['on_the_road', 'less_500m', '500m_1km', '1km_5km', '5km_plus'],
        default: '1km_5km'
    }),
    __metadata("design:type", String)
], Hotel.prototype, "distanceToMainRoad", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hotel.prototype, "coverPhoto", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Hotel.prototype, "gallery", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: HotelAmenitiesSchema }),
    __metadata("design:type", HotelAmenities)
], Hotel.prototype, "amenities", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(ConnectivityType),
        default: ConnectivityType.NONE
    }),
    __metadata("design:type", String)
], Hotel.prototype, "wifiStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        enum: Object.values(PaymentMethod),
        default: [PaymentMethod.CASH]
    }),
    __metadata("design:type", Array)
], Hotel.prototype, "paymentMethods", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(VerificationStatus),
        default: VerificationStatus.UNVERIFIED
    }),
    __metadata("design:type", String)
], Hotel.prototype, "verificationStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Hotel.prototype, "verificationAppliedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Hotel.prototype, "verificationApprovedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hotel.prototype, "verificationRejectionReason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Hotel.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Hotel.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Hotel.prototype, "updatedAt", void 0);
exports.Hotel = Hotel = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Hotel);
exports.HotelSchema = mongoose_1.SchemaFactory.createForClass(Hotel);
exports.HotelSchema.index({ managerId: 1 });
exports.HotelSchema.index({ email: 1 });
exports.HotelSchema.index({ district: 1 });
exports.HotelSchema.index({ townOrCity: 1 });
exports.HotelSchema.index({ verificationStatus: 1 });
exports.HotelSchema.index({ createdAt: -1 });
//# sourceMappingURL=hotel.schema.js.map