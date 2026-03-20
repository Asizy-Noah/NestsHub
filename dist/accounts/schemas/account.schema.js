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
exports.AccountSchema = exports.Account = exports.AccountStatus = exports.AccountRole = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
var AccountRole;
(function (AccountRole) {
    AccountRole["INDIVIDUAL"] = "individual";
    AccountRole["HOSTEL_MANAGER"] = "hostel_manager";
    AccountRole["HOTEL_MANAGER"] = "hotel_manager";
    AccountRole["PROPERTY_MANAGER"] = "property_manager";
    AccountRole["ADMIN"] = "admin";
    AccountRole["STAFF"] = "staff";
})(AccountRole || (exports.AccountRole = AccountRole = {}));
var AccountStatus;
(function (AccountStatus) {
    AccountStatus["PENDING_EMAIL_VERIFICATION"] = "pending_email_verification";
    AccountStatus["EMAIL_VERIFIED"] = "email_verified";
    AccountStatus["PENDING_PASSWORD_SET"] = "pending_password_set";
    AccountStatus["ACTIVE"] = "active";
    AccountStatus["SUSPENDED"] = "suspended";
    AccountStatus["DELETED"] = "deleted";
})(AccountStatus || (exports.AccountStatus = AccountStatus = {}));
let Account = class Account extends mongoose_2.Document {
};
exports.Account = Account;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Account.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Account.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Account.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(AccountRole), required: true }),
    __metadata("design:type", String)
], Account.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Object.values(AccountStatus), default: AccountStatus.PENDING_EMAIL_VERIFICATION }),
    __metadata("design:type", String)
], Account.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], Account.prototype, "emailVerificationToken", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Account.prototype, "emailVerificationExpiry", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "emailVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "passwordResetToken", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Account.prototype, "passwordResetExpiry", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "twoFactorEnabled", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "twoFactorSecret", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "phoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "profilePicture", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Account.prototype, "deletedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Account.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Account.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hostelName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hostelAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hostelCity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hostelCountry", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hostelPhoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hostelRegistrationNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hotelName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hotelAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hotelCity", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hotelCountry", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hotelPhoneNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "hotelRegistrationNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Account.prototype, "hotelStarRating", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "otherNames", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "nationality", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Account.prototype, "idNumber", void 0);
exports.Account = Account = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, discriminatorKey: 'role' })
], Account);
exports.AccountSchema = mongoose_1.SchemaFactory.createForClass(Account);
exports.AccountSchema.index({ role: 1 });
exports.AccountSchema.index({ status: 1 });
exports.AccountSchema.index({ createdAt: -1 });
exports.AccountSchema.index({ emailVerificationToken: 1 });
exports.AccountSchema.index({ passwordResetToken: 1 });
//# sourceMappingURL=account.schema.js.map