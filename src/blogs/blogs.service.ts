import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(createBlogDto: CreateBlogDto, authorId: string, authorName: string) {
    const slug = createBlogDto.slug || this.generateSlug(createBlogDto.title);

    // Check if slug already exists
    const existingBlog = await this.blogModel.findOne({ slug });
    if (existingBlog) {
      throw new BadRequestException('Blog slug already exists');
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

  async findByAuthor(authorId: string, page = 1, limit = 10) {
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

  async findOne(slug: string) {
    const blog = await this.blogModel.findOne({ slug });
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    // Increment views
    await this.blogModel.updateOne({ _id: blog._id }, { $inc: { views: 1 } });

    return blog;
  }

  async findById(id: string) {
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async update(id: string, updateBlogDto: CreateBlogDto, authorId: string) {
    const blog = await this.findById(id);

    // Check authorization
    if (blog.authorId.toString() !== authorId) {
      throw new BadRequestException('You can only edit your own blogs');
    }

    // Check slug uniqueness if changed
    if (updateBlogDto.slug && updateBlogDto.slug !== blog.slug) {
      const existingBlog = await this.blogModel.findOne({ slug: updateBlogDto.slug });
      if (existingBlog) {
        throw new BadRequestException('Blog slug already exists');
      }
    }

    const slug = updateBlogDto.slug || this.generateSlug(updateBlogDto.title);

    const updated = await this.blogModel.findByIdAndUpdate(
      id,
      {
        ...updateBlogDto,
        slug,
        updatedAt: new Date(),
      },
      { new: true },
    );

    return updated;
  }

  async delete(id: string, authorId: string) {
    const blog = await this.findById(id);

    // Check authorization
    if (blog.authorId.toString() !== authorId) {
      throw new BadRequestException('You can only delete your own blogs');
    }

    await this.blogModel.findByIdAndDelete(id);
    return { message: 'Blog deleted successfully' };
  }

  async search(query: string, page = 1, limit = 10) {
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

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }
}
