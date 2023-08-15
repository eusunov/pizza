import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from './user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRole.Admin)
  async create(@Body() createUserDto: CreateUserDto): Promise<undefined> {
    await this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.Admin)
  async findAll(): Promise<UserDto[]>{
    const users = await this.usersService.findAll();
    return users.map((user) => {
      const { password, ...userNoPassword } = user;
      return userNoPassword;
    });
  }

  @Get(':id')
  @Roles(UserRole.Admin)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<UserDto> {
    const user = await this.usersService.findOne(id);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  @Patch(':id')
  @Roles(UserRole.Admin)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto): Promise<undefined> {
    await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<undefined> {
    await this.usersService.remove(id);
  }
}
