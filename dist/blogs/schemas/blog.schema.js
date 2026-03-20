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
exports.BlogSchema = exports.Blog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Blog = class Blog extends mongoose_2.Document {
};
exports.Blog = Blog;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, trim: true, lowercase: true }),
    __metadata("design:type", String)
], Blog.prototype, "slug", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Blog.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Blog.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Blog.prototype, "coverImage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Account', required: true }),
    __metadata("design:type", mongoose_2.Schema.Types.ObjectId)
], Blog.prototype, "authorId", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Blog.prototype, "authorName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'draft' }),
    __metadata("design:type", String)
], Blog.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Blog.prototype, "views", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Blog.prototype, "tags", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Blog.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Blog.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Blog.prototype, "publishedAt", void 0);
exports.Blog = Blog = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Blog);
exports.BlogSchema = mongoose_1.SchemaFactory.createForClass(Blog);
exports.BlogSchema.index({ slug: 1 });
exports.BlogSchema.index({ authorId: 1 });
exports.BlogSchema.index({ status: 1 });
exports.BlogSchema.index({ createdAt: -1 });
exports.BlogSchema.index({ tags: 1 });
//# sourceMappingURL=blog.schema.js.map