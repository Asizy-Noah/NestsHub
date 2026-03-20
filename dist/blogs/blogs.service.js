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
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const blog_schema_1 = require("./schemas/blog.schema");
let BlogsService = class BlogsService {
    constructor(blogModel) {
        this.blogModel = blogModel;
    }
    async create(createBlogDto, authorId, authorName) {
        const slug = createBlogDto.slug || this.generateSlug(createBlogDto.title);
        const existingBlog = await this.blogModel.findOne({ slug });
        if (existingBlog) {
            throw new common_1.BadRequestException('Blog slug already exists');
        }
        const blog = new this.blogModel({
            ...createBlogDto,
            slug,
            authorId,
            authorName,
            status: createBlogDto.status || 'draft',
        });
        return await blog.save();
    }
    async findAll(page = 1, limit = 10, status = 'published') {
        const skip = (page - 1) * limit;
        const blogs = await this.blogModel
            .find({ status })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await this.blogModel.countDocuments({ status });
        return {
            blogs,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findByAuthor(authorId, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const blogs = await this.blogModel
            .find({ authorId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await this.blogModel.countDocuments({ authorId });
        return {
            blogs,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(slug) {
        const blog = await this.blogModel.findOne({ slug });
        if (!blog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        await this.blogModel.updateOne({ _id: blog._id }, { $inc: { views: 1 } });
        return blog;
    }
    async findById(id) {
        const blog = await this.blogModel.findById(id);
        if (!blog) {
            throw new common_1.NotFoundException('Blog not found');
        }
        return blog;
    }
    async update(id, updateBlogDto, authorId) {
        const blog = await this.findById(id);
        if (blog.authorId.toString() !== authorId) {
            throw new common_1.BadRequestException('You can only edit your own blogs');
        }
        if (updateBlogDto.slug && updateBlogDto.slug !== blog.slug) {
            const existingBlog = await this.blogModel.findOne({ slug: updateBlogDto.slug });
            if (existingBlog) {
                throw new common_1.BadRequestException('Blog slug already exists');
            }
        }
        const slug = updateBlogDto.slug || this.generateSlug(updateBlogDto.title);
        const updated = await this.blogModel.findByIdAndUpdate(id, {
            ...updateBlogDto,
            slug,
            updatedAt: new Date(),
        }, { new: true });
        return updated;
    }
    async delete(id, authorId) {
        const blog = await this.findById(id);
        if (blog.authorId.toString() !== authorId) {
            throw new common_1.BadRequestException('You can only delete your own blogs');
        }
        await this.blogModel.findByIdAndDelete(id);
        return { message: 'Blog deleted successfully' };
    }
    async search(query, page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const blogs = await this.blogModel
            .find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } },
            ],
            status: 'published',
        })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        const total = await this.blogModel.countDocuments({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } },
            ],
            status: 'published',
        });
        return {
            blogs,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        };
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(blog_schema_1.Blog.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map