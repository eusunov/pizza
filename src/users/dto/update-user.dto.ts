import { PickType } from '@nestjs/mapped-types'

import { CreateUserDto } from '../dto/create-user.dto'

export class UpdateUserDto extends PickType(CreateUserDto, ['active'] as const) {}
