import { IsString, IsOptional, IsBoolean, IsNumber, IsEnum, Min, Max } from 'class-validator';
import { RoomType, BedSize } from '../schemas/hotel-room.schema';

export class CreateRoomAmenitiesDto {
  @IsOptional()
  @IsBoolean()
  hasBalcony?: boolean;

  @IsOptional()
  @IsBoolean()
  hasHotWater?: boolean;

  @IsOptional()
  @IsBoolean()
  hasTV?: boolean;

  @IsOptional()
  @IsBoolean()
  hasDSTV?: boolean;

  @IsOptional()
  @IsBoolean()
  hasTableChair?: boolean;
}

export class CreateHotelRoomDto {
  @IsOptional()
  @IsString()
  photo?: string;

  @IsEnum(RoomType)
  roomType: RoomType;

  @IsOptional()
  @IsBoolean()
  isSelfContained?: boolean;

  @IsNumber()
  @Min(0)
  @Max(10)
  floor: number;

  @IsOptional()
  amenities?: CreateRoomAmenitiesDto;

  @IsEnum(BedSize)
  bedSize: BedSize;

  @IsNumber()
  @Min(0)
  costPerNight: number;

  @IsOptional()
  @IsBoolean()
  breakfastIncluded?: boolean;

  @IsNumber()
  @Min(1)
  totalRooms: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  bookedRooms?: number;
}

export class UpdateHotelRoomDto extends CreateHotelRoomDto {}

export class UpdateRoomInventoryDto {
  @IsNumber()
  @Min(0)
  bookedRooms: number;
}
