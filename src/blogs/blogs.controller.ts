import { Controller, Get, Post, Put, Delete, Body, Param, Query, Render, UseGuards, Request } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  // Frontend routes
  @Get('index')
  @Render('blogs/index')
  async index(@Query('page') page = '1', @Query('status') status = 'published') {
    const data = await this.blogsService.findAll(parseInt(page), 10, status);
    return {
      title: 'Blogs',
      ...data,
    };
  }

  @Get('create')
  @UseGuards(JwtAuthGuard)
  @Render('blogs/create')
  getCreate() {
    return {
      title: 'Create Blog',
    };
  }

  @Get('edit/:id')
  @UseGuards(JwtAuthGuard)
  @Render('blogs/edit')
  async getEdit(@Param('id') id: string) {
    const blog = await this.blogsService.findById(id);
    return {
      title: 'Edit Blog',
      blog,
    };
  }

  @Get(':slug')
  @Render('blogs/show')
  async show(@Param('slug') slug: string) {
    const blog = await this.blogsService.findOne(slug);
    return {
      title: blog.title,
      blog,
    };
  }

  // API routes
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  async create(@Body() createBlogDto: CreateBlogDto, @Request() req) {
    return await this.blogsService.create(createBlogDto, req.user.userId, req.user.firstName);
  }

  @Get()
  async findAll(@Query('page') page = '1', @Query('status') status = 'published') {
    return await this.blogsService.findAll(parseInt(page), 10, status);
  }

  @Get('author/:authorId')
  async findByAuthor(@Param('authorId') authorId: string, @Query('page') page = '1') {
    return await this.blogsService.findByAuthor(authorId, parseInt(page), 10);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: CreateBlogDto,
    @Request() req,
  ) {
    return await this.blogsService.update(id, updateBlogDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'staff')
  async delete(@Param('id') id: string, @Request() req) {
    return await this.blogsService.delete(id, req.user.userId);
  }

  @Get('search')
  async search(@Query('q') query: string, @Query('page') page = '1') {
    return await this.blogsService.search(query, parseInt(page), 10);
  }
}
