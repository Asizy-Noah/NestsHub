import { IsEmail, IsString, IsEnum, MinLength } from 'class-validator';
import { AccountRole } from '../../accounts/schemas/account.schema';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsEnum(AccountRole)
  role: AccountRole;
}
