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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsController = void 0;
const common_1 = require("@nestjs/common");
const blogs_service_1 = require("./blogs.service");
const create_blog_dto_1 = require("./dto/create-blog.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
let BlogsController = class BlogsController {
    constructor(blogsService) {
        this.blogsService = blogsService;
    }
    async create(createBlogDto, req) {
        return await this.blogsService.create(createBlogDto, req.user.userId, req.user.firstName);
    }
    async findAll(page = '1', status = 'published') {
        return await this.blogsService.findAll(parseInt(page), 10, status);
    }
    async search(query, page = '1') {
        return await this.blogsService.search(query, parseInt(page), 10);
    }
    async findByAuthor(authorId, page = '1') {
        return await this.blogsService.findByAuthor(authorId, parseInt(page), 10);
    }
    async index(page = '1', status = 'published') {
        const data = await this.blogsService.findAll(parseInt(page), 10, status);
        return {
            title: 'Blogs',
            ...data,
        };
    }
    getCreate() {
        return {
            title: 'Create Blog',
        };
    }
    async getEdit(id) {
        const blog = await this.blogsService.findById(id);
        return {
            title: 'Edit Blog',
            blog,
        };
    }
    async update(id, updateBlogDto, req) {
        return await this.blogsService.update(id, updateBlogDto, req.user.userId);
    }
    async delete(id, req) {
        return await this.blogsService.delete(id, req.user.userId);
    }
    async show(slug) {
        const blog = await this.blogsService.findOne(slug);
        return {
            title: blog.title,
            blog,
        };
    }
};
exports.BlogsController = BlogsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'staff'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_blog_dto_1.CreateBlogDto, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('author/:authorId'),
    __param(0, (0, common_1.Param)('authorId')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "findByAuthor", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.Render)('blogs/index'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "index", null);
__decorate([
    (0, common_1.Get)('new'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Render)('blogs/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BlogsController.prototype, "getCreate", null);
__decorate([
    (0, common_1.Get)(':id/edit'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Render)('blogs/edit'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "getEdit", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'staff'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_blog_dto_1.CreateBlogDto, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin', 'staff'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':slug'),
    (0, common_1.Render)('blogs/show'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BlogsController.prototype, "show", null);
exports.BlogsController = BlogsController = __decorate([
    (0, common_1.Controller)('blogs'),
    __metadata("design:paramtypes", [blogs_service_1.BlogsService])
], BlogsController);
//# sourceMappingURL=blogs.controller.js.map