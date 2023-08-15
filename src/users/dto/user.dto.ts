import { IsUUID, IsDate } from 'class-validator';
import { IntersectionType, OmitType } from '@nestjs/mapped-types'

import { CreateUserDto } from './create-user.dto'

class AdditionalUserInfo {
  @IsUUID(4)
  id: string;

  @IsDate()
  created: Date;

  @IsDate()
  updated: Date;
}

class CreateUserNoPasswordDto extends OmitType(CreateUserDto, ['password'] as const) {}

export class UserDto extends IntersectionType(
  CreateUserNoPasswordDto,
  AdditionalUserInfo,
) {}
