import { IsString, IsEnum, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { RoomType, CookingPolicy } from '../schemas/room.schema';

export class CreateRoomDto {
  @IsString()
  roomNumber!: string;

  @IsEnum(RoomType)
  type!: RoomType;

  @IsNumber()
  floor!: number;

  @IsOptional()
  @IsBoolean()
  isSelfContained?: boolean;

  @IsOptional()
  @IsEnum(CookingPolicy)
  cookingPolicy?: CookingPolicy;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsNumber()
  pricePerMonth?: number;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  amenities?: string[];
}

export class UpdateRoomDto {
  @IsOptional()
  @IsString()
  roomNumber?: string;

  @IsOptional()
  @IsEnum(RoomType)
  type?: RoomType;

  @IsOptional()
  @IsNumber()
  floor?: number;

  @IsOptional()
  @IsBoolean()
  isSelfContained?: boolean;

  @IsOptional()
  @IsEnum(CookingPolicy)
  cookingPolicy?: CookingPolicy;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsNumber()
  pricePerMonth?: number;

  @IsOptional()
  @IsNumber()
  capacity?: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  amenities?: string[];
}
