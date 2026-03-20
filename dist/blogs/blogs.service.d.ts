import { Model } from 'mongoose';
import { Blog } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
export declare class BlogsService {
    private blogModel;
    constructor(blogModel: Model<Blog>);
    create(createBlogDto: CreateBlogDto, authorId: string, authorName: string): Promise<import("mongoose").Document<unknown, {}, Blog, {}, {}> & Blog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(page?: number, limit?: number, status?: string): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, Blog, {}, {}> & Blog & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    findByAuthor(authorId: string, page?: number, limit?: number): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, Blog, {}, {}> & Blog & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    findOne(slug: string): Promise<import("mongoose").Document<unknown, {}, Blog, {}, {}> & Blog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findById(id: string): Promise<import("mongoose").Document<unknown, {}, Blog, {}, {}> & Blog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, updateBlogDto: CreateBlogDto, authorId: string): Promise<(import("mongoose").Document<unknown, {}, Blog, {}, {}> & Blog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    delete(id: string, authorId: string): Promise<{
        message: string;
    }>;
    search(query: string, page?: number, limit?: number): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, Blog, {}, {}> & Blog & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            pages: number;
        };
    }>;
    private generateSlug;
}
//# sourceMappingURL=blogs.service.d.ts.map