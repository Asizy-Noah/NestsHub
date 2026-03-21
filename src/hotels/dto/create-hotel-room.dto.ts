import { IsString, IsNumber, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateHotelRoomDto {
  @IsString()
  type!: string; // e.g., 'Single', 'Double', 'Suite'

  @IsNumber()
  totalRooms!: number;

  @IsOptional()
  @IsNumber()
  availableRooms?: number;

  @IsNumber()
  floorLevel!: number;

  @IsBoolean()
  isSelfContained!: boolean;

  @IsBoolean()
  hasBalcony!: boolean;

  @IsBoolean()
  hasAC!: boolean;

  @IsBoolean()
  isAccessible!: boolean;

  @IsBoolean()
  bedAndBreakfast!: boolean;

  @IsBoolean()
  workingTable!: boolean;

  @IsBoolean()
  hotWater!: boolean;

  @IsBoolean()
  hasTV!: boolean;

  @IsNumber()
  price!: number;

  @IsString()
  pricingPeriod!: string; // e.g., 'Per Night'

  @IsString()
  bedSize!: string; // e.g., 'King Size'

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  photos?: string[];
}