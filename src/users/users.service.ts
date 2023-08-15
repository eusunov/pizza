import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { SALT_OR_ROUNDS } from './constants';
import { User } from './entities/user.entity';
import { UserRole } from './user-role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {

  // Mock the database with an in-memory store.
  private users: Map<string, User> = new Map();

  // Mock the database initial setup with one admin, one pizza maker/supplier and one customer.
  // The password is 11223344
  constructor() {
    const date = new Date()
    this.users.set('002fec50-724b-4975-9b89-ffe80f1bf9a6', {
      active: true,
      email: 'emil@hearit.io',
      name: 'Maker & Supplier',
      role: [UserRole.Maker, UserRole.Supplier],
      phone: '+359888765802',
      password: '$2b$10$Su0.tXVVPyCW5DXR3CHFlevQL5aPZqB2cBrsvl7sypUM1BlvaEyuK',
      id: '002fec50-724b-4975-9b89-ffe80f1bf9a6',
      created: date,
      updated: date,
    })
    this.users.set('c4a3f705-b3f8-43d2-b7b0-3ad0f3b1e412', {
      active: true,
      email: 'admin@hearit.io',
      name: 'Admin',
      role: [UserRole.Admin],
      phone: '+359888765802',
      password: '$2b$10$e228lGxm07AXgIpTwLnvzeZq2BHpDSTjX2TrOhTe4E8uNntUxi5dm',
      id: 'c4a3f705-b3f8-43d2-b7b0-3ad0f3b1e412',
      created: date,
      updated: date,
    })
    this.users.set('a6f1b1e1-42fa-474e-be3b-2bd190b3a20d', {
      active: true,
      email: 'ivan@ivanov.com',
      name: 'Ivan Ivanov',
      role: [UserRole.Customer],
      phone: '+359888777777',
      password: '$2b$10$e228lGxm07AXgIpTwLnvzeZq2BHpDSTjX2TrOhTe4E8uNntUxi5dm',
      id: 'a6f1b1e1-42fa-474e-be3b-2bd190b3a20d',
      created: date,
      updated: date,
    })
  }

  public async create(user: CreateUserDto): Promise<undefined> {
    try {
      await this.findOneByEmail(user.email)
      throw new NotAcceptableException()
    } catch (error) {
      if (error instanceof NotAcceptableException) {
        throw error
      }
    }

    // Needs to generate the uuid in the proper way. For this proptotype is ok.
    const { randomUUID } = await import('node:crypto');
    const uuid = randomUUID()
    const date = new Date()
    user.password = await bcrypt.hash(user.password, SALT_OR_ROUNDS);
    this.users.set(
      uuid,
      Object.assign({}, user, { id: uuid, created: date, updated: date })
    )
    return
  }

  public async findAll(): Promise<User[]> {
    const users = [];
    for (const [, user] of this.users.entries()) {
      users.push(user);
    }
    if (users.length === 0) {
      throw new NotFoundException();
    }
    return users;
  }

  public async findOne(id: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  
  public async update(id: string, updateUserDto: UpdateUserDto): Promise<undefined> {
    const user = this.users.get(id);
    if (user) {
      const date = new Date();
      this.users.set(user.id, Object.assign(user, updateUserDto, { updated: date }));
      return
    }
    throw new NotAcceptableException();
  }

  public async remove(id: string): Promise<undefined>  {
    const user = this.users.get(id);
    if (user && this.users.delete(user.id)) {
      return
    }
    throw new NotAcceptableException();
  }

  // Not very efficient, but for this prototype is ok.
  public async findOneByEmail(email: string): Promise<User> {
    for (const [, user] of this.users.entries()) {
      if (email === user.email ) {
        return user
      }
    }
    throw new NotFoundException();
  }
}
