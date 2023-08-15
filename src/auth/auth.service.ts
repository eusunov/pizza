import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dto/user.dto';
import { UserRole } from '../users/user-role.enum';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async register(registerUserDto: RegisterUserDto): Promise<undefined> {
    const user: CreateUserDto = Object.assign({}, registerUserDto, { role: [ UserRole.Customer ] })
    await this.usersService.create(user)
  }

  public async logIn(inEmail: string, inPassword: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(inEmail);
    if (!user || !user?.password) {
      throw new UnauthorizedException();
    }
    const match = await bcrypt.compare(inPassword, user.password)
    if (!match) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  public async getUserProfile (id: string): Promise<UserDto> {
    const user = await this.usersService.findOne(id);
    const { password, ...userNoPassword } = user;
    return userNoPassword
  }
}
