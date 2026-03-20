import { Document, Schema as MongoSchema } from 'mongoose';
export declare class Blog extends Document {
    slug: string;
    title: string;
    content: string;
    coverImage: string;
    authorId: MongoSchema.Types.ObjectId;
    authorName: string;
    status: string;
    views: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
}
export declare const BlogSchema: MongoSchema<Blog, import("mongoose").Model<Blog, any, any, any, Document<unknown, any, Blog, any, {}> & Blog & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blog, Document<unknown, {}, import("mongoose").FlatRecord<Blog>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Blog> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
//# sourceMappingURL=blog.schema.d.ts.map