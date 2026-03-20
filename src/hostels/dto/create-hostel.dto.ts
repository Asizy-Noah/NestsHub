import { IsString, IsNumber, IsOptional, IsBoolean, IsObject } from 'class-validator';

export class CreateHostelDto {
  @IsString()
  name!: string;

  @IsOptional() @IsString() tel?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() whatsapp?: string;
  
  @IsOptional() @IsString() locationType?: string;
  @IsOptional() @IsNumber() distance?: number;

  @IsOptional() @IsObject() proximity?: any;
  @IsOptional() @IsObject() amenities?: any;
  @IsOptional() @IsObject() services?: any;
}