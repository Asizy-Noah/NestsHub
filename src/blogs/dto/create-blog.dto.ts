import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsString()
  @IsOptional()
  coverImage!: string;

  @IsString()
  @IsOptional()
  slug!: string;

  @IsArray()
  @IsOptional()
  tags!: string[];

  @IsString()
  @IsOptional()
  status!: string; // 'draft' or 'published'
}
