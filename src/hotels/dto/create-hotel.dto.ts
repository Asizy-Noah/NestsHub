import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsObject } from 'class-validator';

export class CreateHotelDto {
  @IsString() name!: string;

  @IsArray() @IsString({ each: true }) phones!: string[];
  @IsArray() @IsString({ each: true }) whatsapps!: string[];
  @IsArray() @IsString({ each: true }) emails!: string[];

  @IsOptional() @IsString() profilePhoto?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) gallery?: string[];

  // UPDATED: Location
  @IsString() @IsOptional() districtOrCity?: string;
  @IsString() @IsOptional() division?: string;
  @IsString() @IsOptional() nearestTown?: string;
  @IsNumber() @IsOptional() distanceFromTown?: number;
  @IsString() @IsOptional() popularAreaName?: string;
  @IsString() @IsOptional() street?: string;
  @IsString() @IsOptional() address?: string;
  @IsBoolean() @IsOptional() accessTarmacked?: boolean;

  // UPDATED: Amenities
  @IsObject() @IsOptional()
  amenities?: {
    security: boolean; gym: boolean; swimmingPool: boolean; parking: boolean;
    freeInternet: boolean; restaurant: boolean; prayerRoom: boolean; bar: boolean;
    massage: boolean; sauna: boolean; salon: boolean; dstv: boolean; cottages: boolean;
    gardens: boolean; greenery: boolean;
  };
}