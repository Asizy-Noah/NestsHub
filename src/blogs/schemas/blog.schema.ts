import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Blog extends Document {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  slug!: string;

  @Prop({ required: true, trim: true })
  title!: string;

  @Prop({ required: true })
  content!: string;

  @Prop()
  coverImage!: string;

  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'Account', required: true })
  authorId!: MongoSchema.Types.ObjectId;

  @Prop()
  authorName!: string;

  @Prop({ default: 'draft' })
  status!: string; // draft, published

  @Prop({ default: 0 })
  views!: number;

  @Prop({ type: [String], default: [] })
  tags!: string[];

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;

  @Prop()
  publishedAt!: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

// Indexes for better query performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ authorId: 1 });
BlogSchema.index({ status: 1 });
BlogSchema.index({ createdAt: -1 });
BlogSchema.index({ tags: 1 });
