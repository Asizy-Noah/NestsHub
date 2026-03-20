import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
export declare class BlogsController {
    private blogsService;
    constructor(blogsService: BlogsService);
    create(createBlogDto: CreateBlogDto, req: any): Promise<import("mongoose").Document<unknown, {}, import("./schemas/blog.schema").Blog, {}, {}> & import("./schemas/blog.schema").Blog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(page?: string, status?: string): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, import("./schemas/blog.schema").Blog, {}, {}> & import("./schemas/blog.schema").Blog & Required<{
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
    search(query: string, page?: string): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, import("./schemas/blog.schema").Blog, {}, {}> & import("./schemas/blog.schema").Blog & Required<{
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
    findByAuthor(authorId: string, page?: string): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, import("./schemas/blog.schema").Blog, {}, {}> & import("./schemas/blog.schema").Blog & Required<{
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
    index(page?: string, status?: string): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, import("./schemas/blog.schema").Blog, {}, {}> & import("./schemas/blog.schema").Blog & Required<{
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
        title: string;
    }>;
    getCreate(): {
        title: string;
    };
    getEdit(id: string): Promise<{
        title: string;
        blog: import("mongoose").Document<unknown, {}, import("./schemas/blog.schema").Blog, {}, {}> & import("./schemas/blog.schema").Blog & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
    update(id: string, updateBlogDto: CreateBlogDto, req: any): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/blog.schema").Blog, {}, {}> & import("./schemas/blog.schema").Blog & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    delete(id: string, req: any): Promise<{
        message: string;
    }>;
    show(slug: string): Promise<{
        title: string;
        blog: import("mongoose").Document<unknown, {}, import("./schemas/blog.schema").Blog, {}, {}> & import("./schemas/blog.schema").Blog & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        };
    }>;
}
//# sourceMappingURL=blogs.controller.d.ts.map