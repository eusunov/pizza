import { IsEmail, IsNotEmpty, IsString, MinLength, IsArray, IsBoolean } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsArray()
  role: UserRole[];

  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsBoolean()
  active: boolean = true;
}
