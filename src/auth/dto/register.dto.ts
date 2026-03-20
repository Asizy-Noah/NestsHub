import { IsEmail, IsString, IsEnum, MinLength, IsOptional } from 'class-validator';
import { AccountRole } from '../../accounts/schemas/account.schema';

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(2)
  firstName!: string;

  @IsString()
  @MinLength(2)
  lastName!: string;

  @IsEnum(AccountRole)
  role!: AccountRole;

  @IsOptional()
  @IsString()
  otherNames?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  idNumber?: string;

  @IsOptional()
  @IsString()
  hostelName?: string;

  @IsOptional()
  @IsString()
  hotelName?: string;
  
  @IsOptional()
  @IsString()
  adminCode?: string;
}
