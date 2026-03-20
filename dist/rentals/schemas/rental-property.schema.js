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
exports.RentalPropertySchema = exports.RentalProperty = exports.VerificationStatus = exports.BillingPayer = exports.AccessRoadType = exports.BuildingStyle = exports.HouseType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var HouseType;
(function (HouseType) {
    HouseType["STUDIO"] = "studio";
    HouseType["ONE_BEDROOM"] = "1-bedroom";
    HouseType["TWO_BEDROOM"] = "2-bedroom";
    HouseType["THREE_BEDROOM"] = "3-bedroom";
    HouseType["FOUR_BEDROOM"] = "4-bedroom";
})(HouseType || (exports.HouseType = HouseType = {}));
var BuildingStyle;
(function (BuildingStyle) {
    BuildingStyle["FLAT_STOREY"] = "flat_storey";
    BuildingStyle["SINGLE_LEVEL"] = "single_level";
})(BuildingStyle || (exports.BuildingStyle = BuildingStyle = {}));
var AccessRoadType;
(function (AccessRoadType) {
    AccessRoadType["TARMAC"] = "tarmac";
    AccessRoadType["MURRAM_GRAVEL"] = "murram_gravel";
})(AccessRoadType || (exports.AccessRoadType = AccessRoadType = {}));
var BillingPayer;
(function (BillingPayer) {
    BillingPayer["TENANT"] = "tenant";
    BillingPayer["LANDLORD"] = "landlord";
})(BillingPayer || (exports.BillingPayer = BillingPayer = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["UNVERIFIED"] = "unverified";
    VerificationStatus["PENDING"] = "pending";
    VerificationStatus["VERIFIED"] = "verified";
    VerificationStatus["REJECTED"] = "rejected";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
let RentalProperty = class RentalProperty extends mongoose_2.Document {
};
exports.RentalProperty = RentalProperty;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Account', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], RentalProperty.prototype, "managerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RentalProperty.prototype, "propertyName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(HouseType),
        required: true,
    }),
    __metadata("design:type", String)
], RentalProperty.prototype, "houseType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(BuildingStyle),
        required: true,
    }),
    __metadata("design:type", String)
], RentalProperty.prototype, "buildingStyle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 1 }),
    __metadata("design:type", Number)
], RentalProperty.prototype, "unitCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], RentalProperty.prototype, "monthlyRent", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RentalProperty.prototype, "isSelfContained", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RentalProperty.prototype, "isFenced", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RentalProperty.prototype, "isCompoundPaved", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RentalProperty.prototype, "hasAmpleParking", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RentalProperty.prototype, "hasOutsideWashrooms", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RentalProperty.prototype, "hasSecurity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RentalProperty.prototype, "hasWater", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], RentalProperty.prototype, "isFurnished", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], RentalProperty.prototype, "furnitureList", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(BillingPayer),
        default: BillingPayer.TENANT,
    }),
    __metadata("design:type", String)
], RentalProperty.prototype, "waterBillPaidBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(BillingPayer),
        default: BillingPayer.TENANT,
    }),
    __metadata("design:type", String)
], RentalProperty.prototype, "electricityBillPaidBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(BillingPayer),
        default: BillingPayer.LANDLORD,
    }),
    __metadata("design:type", String)
], RentalProperty.prototype, "securityFeePaidBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RentalProperty.prototype, "nearestTown", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], RentalProperty.prototype, "nearestCity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "nearestRoad", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(AccessRoadType),
        required: true,
    }),
    __metadata("design:type", String)
], RentalProperty.prototype, "accessRoadType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], RentalProperty.prototype, "distanceToTarmac", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "distanceToGym", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "distanceToSupermarket", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "distanceToGroceries", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "shoppingCenterName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "coverPhoto", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], RentalProperty.prototype, "gallery", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "contactPerson", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "telephone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "whatsapp", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: Object.values(VerificationStatus),
        default: VerificationStatus.UNVERIFIED,
    }),
    __metadata("design:type", String)
], RentalProperty.prototype, "verificationStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], RentalProperty.prototype, "verificationAppliedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], RentalProperty.prototype, "verificationApprovedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "verificationRejectionReason", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], RentalProperty.prototype, "verificationProofUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], RentalProperty.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], RentalProperty.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], RentalProperty.prototype, "updatedAt", void 0);
exports.RentalProperty = RentalProperty = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], RentalProperty);
exports.RentalPropertySchema = mongoose_1.SchemaFactory.createForClass(RentalProperty);
exports.RentalPropertySchema.index({ managerId: 1 });
exports.RentalPropertySchema.index({ houseType: 1 });
exports.RentalPropertySchema.index({ nearestCity: 1 });
exports.RentalPropertySchema.index({ nearestTown: 1 });
exports.RentalPropertySchema.index({ verificationStatus: 1 });
exports.RentalPropertySchema.index({ createdAt: -1 });
exports.RentalPropertySchema.index({ isActive: 1 });
//# sourceMappingURL=rental-property.schema.js.map