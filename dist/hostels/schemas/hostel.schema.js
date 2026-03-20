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
exports.HostelSchema = exports.Hostel = exports.Services = exports.Amenities = exports.VerificationStatus = exports.CateringType = exports.InternetType = exports.LocationType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var LocationType;
(function (LocationType) {
    LocationType["UNIVERSITY"] = "university";
    LocationType["TOWN"] = "town";
})(LocationType || (exports.LocationType = LocationType = {}));
var InternetType;
(function (InternetType) {
    InternetType["FREE"] = "free";
    InternetType["PAID"] = "paid";
    InternetType["NONE"] = "none";
})(InternetType || (exports.InternetType = InternetType = {}));
var CateringType;
(function (CateringType) {
    CateringType["INCLUDED"] = "included";
    CateringType["ADDITIONAL_FEE"] = "additional_fee";
    CateringType["NONE"] = "none";
})(CateringType || (exports.CateringType = CateringType = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["UNVERIFIED"] = "unverified";
    VerificationStatus["PENDING"] = "pending";
    VerificationStatus["VERIFIED"] = "verified";
    VerificationStatus["REJECTED"] = "rejected";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
let Amenities = class Amenities extends mongoose_2.Document {
};
exports.Amenities = Amenities;
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "security", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "tvRoom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "readingRoom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "gym", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "swimmingPool", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "parking", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "wifi", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "laundry", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Amenities.prototype, "generator", void 0);
exports.Amenities = Amenities = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Amenities);
const AmenitiesSchema = mongoose_1.SchemaFactory.createForClass(Amenities);
let Services = class Services extends mongoose_2.Document {
};
exports.Services = Services;
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(InternetType), default: InternetType.NONE }),
    __metadata("design:type", String)
], Services.prototype, "internet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(CateringType), default: CateringType.NONE }),
    __metadata("design:type", String)
], Services.prototype, "catering", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Services.prototype, "distanceToMarket", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Services.prototype, "distanceToHospital", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Services.prototype, "distanceToPharmacy", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Services.prototype, "distanceToClinic", void 0);
exports.Services = Services = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Services);
const ServicesSchema = mongoose_1.SchemaFactory.createForClass(Services);
let Hostel = class Hostel extends mongoose_2.Document {
};
exports.Hostel = Hostel;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Account', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Hostel.prototype, "managerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Hostel.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hostel.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hostel.prototype, "telephone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Hostel.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hostel.prototype, "whatsapp", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hostel.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hostel.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hostel.prototype, "country", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(LocationType), required: true }),
    __metadata("design:type", String)
], Hostel.prototype, "locationType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Hostel.prototype, "distance", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: AmenitiesSchema }),
    __metadata("design:type", Amenities)
], Hostel.prototype, "amenities", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: ServicesSchema }),
    __metadata("design:type", Services)
], Hostel.prototype, "services", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hostel.prototype, "coverImage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Hostel.prototype, "utilityImages", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(VerificationStatus), default: VerificationStatus.UNVERIFIED }),
    __metadata("design:type", String)
], Hostel.prototype, "verificationStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Hostel.prototype, "verificationAppliedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Hostel.prototype, "verificationApprovedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Hostel.prototype, "verificationRejectionReason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], Hostel.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Hostel.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Hostel.prototype, "updatedAt", void 0);
exports.Hostel = Hostel = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Hostel);
exports.HostelSchema = mongoose_1.SchemaFactory.createForClass(Hostel);
exports.HostelSchema.index({ managerId: 1 });
exports.HostelSchema.index({ email: 1 });
exports.HostelSchema.index({ city: 1 });
exports.HostelSchema.index({ verificationStatus: 1 });
exports.HostelSchema.index({ createdAt: -1 });
//# sourceMappingURL=hostel.schema.js.map