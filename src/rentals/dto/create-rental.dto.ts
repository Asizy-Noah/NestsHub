import {
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
  IsArray,
  IsOptional,
  IsEmail,
  Min,
} from 'class-validator';
import {
  HouseType,
  BuildingStyle,
  AccessRoadType,
  BillingPayer,
} from '../schemas/rental-property.schema';

export class CreateRentalDto {
  @IsString()
  propertyName!: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsEnum(HouseType)
  houseType!: HouseType;

  @IsEnum(BuildingStyle)
  buildingStyle!: BuildingStyle;

  @IsNumber()
  @Min(1)
  unitCount!: number;

  @IsOptional()
  @IsNumber()
  monthlyRent!: number;

  // Property Features
  @IsBoolean()
  isSelfContained!: boolean;

  @IsBoolean()
  isFenced!: boolean;

  @IsBoolean()
  isCompoundPaved!: boolean;

  @IsBoolean()
  hasAmpleParking!: boolean;

  @IsBoolean()
  hasOutsideWashrooms!: boolean;

  @IsBoolean()
  hasSecurity!: boolean;

  @IsBoolean()
  hasWater!: boolean;

  // Furnishing
  @IsBoolean()
  isFurnished!: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  furnitureList!: string[];

  // Billing
  @IsEnum(BillingPayer)
  waterBillPaidBy!: BillingPayer;

  @IsEnum(BillingPayer)
  electricityBillPaidBy!: BillingPayer;

  @IsEnum(BillingPayer)
  securityFeePaidBy!: BillingPayer;

  // Location
  @IsString()
  nearestTown!: string;

  @IsString()
  nearestCity!: string;

  @IsOptional()
  @IsString()
  nearestRoad!: string;

  @IsEnum(AccessRoadType)
  accessRoadType!: AccessRoadType;

  @IsOptional()
  @IsNumber()
  distanceToTarmac!: number;

  // Proximity
  @IsOptional()
  @IsString()
  distanceToGym!: string;

  @IsOptional()
  @IsString()
  distanceToSupermarket!: string;

  @IsOptional()
  @IsString()
  distanceToGroceries!: string;

  @IsOptional()
  @IsString()
  shoppingCenterName!: string;

  // Contact
  @IsOptional()
  @IsString()
  contactPerson!: string;

  @IsOptional()
  @IsString()
  telephone!: string;

  @IsOptional()
  @IsString()
  whatsapp!: string;

  @IsOptional()
  @IsEmail()
  email!: string;
}

export class UpdateRentalDto extends CreateRentalDto {
  @IsOptional()
  @IsString()
  coverPhoto!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gallery!: string[];
}
