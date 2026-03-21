import { 
  IsString, 
  IsNumber, 
  IsBoolean, 
  IsOptional, 
  IsArray, 
  IsObject 
} from 'class-validator';

export class CreateRentalDto {
  // 1. Unit Attributes
  @IsString() category!: string;
  @IsNumber() floorLevel!: number;
  @IsNumber() totalRooms!: number;
  @IsNumber() price!: number;
  @IsString() rateType!: string;

  @IsBoolean() isSelfContained!: boolean;
  @IsBoolean() accessiblePWD!: boolean;
  @IsBoolean() hasVeranda!: boolean;
  @IsBoolean() hasBalcony!: boolean;
  @IsBoolean() hasAC!: boolean;
  @IsBoolean() hotWater!: boolean;
  @IsBoolean() paidWater!: boolean;
  @IsBoolean() paidElectricity!: boolean;
  @IsBoolean() paidInternet!: boolean;

  @IsBoolean() isFurnished!: boolean;
  @IsArray() @IsString({ each: true }) furnishing!: string[];
  @IsArray() @IsString({ each: true }) cookingMethods!: string[];
  @IsArray() @IsString({ each: true }) unitPhotos!: string[];

  // 2. Property Attributes
  @IsString() propertyType!: string;
  @IsBoolean() fenced!: boolean;
  @IsBoolean() parking!: boolean;
  @IsBoolean() backyard!: boolean;
  @IsBoolean() largeCompound!: boolean;
  @IsBoolean() greenery!: boolean;
  @IsBoolean() cctvs!: boolean;
  @IsBoolean() security!: boolean;
  @IsBoolean() tarmackedAccess!: boolean;
  @IsArray() @IsString({ each: true }) propertyPhotos!: string[];

  // 3. Nearby Services
  @IsBoolean() nearbyPharmacy!: boolean;
  @IsBoolean() nearbyGym!: boolean;
  @IsBoolean() nearbyGrocery!: boolean;
  @IsBoolean() nearbyBodaboda!: boolean;
  @IsString() @IsOptional() hospitalName?: string;
  @IsString() @IsOptional() marketName?: string;
  @IsArray() @IsString({ each: true }) @IsOptional() restaurantLevels?: string[];

  // 4. Location Details
  @IsString() district!: string;
  @IsString() division!: string;
  @IsString() nearestTown!: string;
  @IsNumber() distanceToTown!: number;
  @IsString() popularAreaName!: string;
  @IsString() streetName!: string;
  @IsNumber() distanceToTarmac!: number;
}