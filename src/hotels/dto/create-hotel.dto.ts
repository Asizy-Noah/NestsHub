import { IsString, IsEmail, IsOptional, IsBoolean, IsArray, IsEnum, MinLength } from 'class-validator';
import { ConnectivityType, PaymentMethod } from '../schemas/hotel.schema';

export class CreateHotelAmenitiesDto {
  @IsOptional()
  @IsBoolean()
  gym?: boolean;

  @IsOptional()
  @IsBoolean()
  bar?: boolean;

  @IsOptional()
  @IsBoolean()
  restaurant?: boolean;

  @IsOptional()
  @IsBoolean()
  parkingSpace?: boolean;

  @IsOptional()
  @IsBoolean()
  storageBuilding?: boolean;

  @IsOptional()
  @IsBoolean()
  supermarketNearby?: boolean;
}

export class CreateHotelDto {
  @IsString()
  @MinLength(3)
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

  @IsString()
  @MinLength(2)
  district: string;

  @IsString()
  @MinLength(2)
  townOrCity: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsEnum(['on_the_road', 'less_500m', '500m_1km', '1km_5km', '5km_plus'])
  distanceToMainRoad?: string;

  @IsOptional()
  @IsString()
  coverPhoto?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery?: string[];

  @IsOptional()
  amenities?: CreateHotelAmenitiesDto;

  @IsOptional()
  @IsEnum(ConnectivityType)
  wifiStatus?: ConnectivityType;

  @IsOptional()
  @IsArray()
  @IsEnum(PaymentMethod, { each: true })
  paymentMethods?: PaymentMethod[];
}

export class UpdateHotelDto extends CreateHotelDto {}
