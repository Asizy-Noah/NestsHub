import { IsString, IsEmail, IsOptional, IsPhoneNumber, IsArray } from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  hostelName?: string;

  @IsOptional()
  @IsString()
  hostelAddress?: string;

  @IsOptional()
  @IsString()
  hostelCity?: string;

  @IsOptional()
  @IsString()
  hostelCountry?: string;

  @IsOptional()
  @IsString()
  hotelName?: string;

  @IsOptional()
  @IsString()
  hotelAddress?: string;

  @IsOptional()
  @IsString()
  hotelCity?: string;

  @IsOptional()
  @IsString()
  hotelCountry?: string;

  @IsOptional() @IsEmail() email?: string; // Important if email is ever sent back
  @IsOptional() @IsString() photo?: string;

  @IsOptional() @IsArray() @IsString({ each: true }) phones?: string[];
  @IsOptional() @IsArray() @IsString({ each: true }) whatsapps?: string[];
}
