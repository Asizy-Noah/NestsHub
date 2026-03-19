import { IsString, IsEmail, IsEnum, IsNumber, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { LocationType, InternetType, CateringType } from '../schemas/hostel.schema';

export class AmenitiesDto {
  @IsOptional()
  @IsBoolean()
  security?: boolean;

  @IsOptional()
  @IsBoolean()
  tvRoom?: boolean;

  @IsOptional()
  @IsBoolean()
  readingRoom?: boolean;

  @IsOptional()
  @IsBoolean()
  gym?: boolean;

  @IsOptional()
  @IsBoolean()
  swimmingPool?: boolean;

  @IsOptional()
  @IsBoolean()
  parking?: boolean;

  @IsOptional()
  @IsBoolean()
  wifi?: boolean;

  @IsOptional()
  @IsBoolean()
  laundry?: boolean;

  @IsOptional()
  @IsBoolean()
  generator?: boolean;
}

export class ServicesDto {
  @IsOptional()
  @IsEnum(InternetType)
  internet?: InternetType;

  @IsOptional()
  @IsEnum(CateringType)
  catering?: CateringType;

  @IsOptional()
  @IsNumber()
  distanceToMarket?: number;

  @IsOptional()
  @IsNumber()
  distanceToHospital?: number;

  @IsOptional()
  @IsNumber()
  distanceToPharmacy?: number;

  @IsOptional()
  @IsNumber()
  distanceToClinic?: number;
}

export class CreateHostelDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsEnum(LocationType)
  locationType: LocationType;

  @IsOptional()
  @IsNumber()
  distance?: number;

  @IsOptional()
  amenities?: AmenitiesDto;

  @IsOptional()
  services?: ServicesDto;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsArray()
  utilityImages?: string[];
}

export class UpdateHostelDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  whatsapp?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsEnum(LocationType)
  locationType?: LocationType;

  @IsOptional()
  @IsNumber()
  distance?: number;

  @IsOptional()
  amenities?: AmenitiesDto;

  @IsOptional()
  services?: ServicesDto;

  @IsOptional()
  @IsString()
  coverImage?: string;

  @IsOptional()
  @IsArray()
  utilityImages?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ApplyVerificationDto {
  @IsOptional()
  @IsString()
  additionalInfo?: string;
}
