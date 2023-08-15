import * as bcrypt from 'bcrypt';

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

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderDto } from './dto/order.dto';
import { OrdersService } from './orders.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import { UserRole } from '../users/user-role.enum';
import { OrderStatus } from './order-status.enum';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<undefined> {
    createOrderDto.status = OrderStatus.Ordered;
    await this.ordersService.create(createOrderDto);
  }

  @Get()
  @Roles(UserRole.Admin, UserRole.Maker, UserRole.Supplier)
  async findAll(): Promise<OrderDto[]>{
    return await this.ordersService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.Admin, UserRole.Maker, UserRole.Supplier)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<OrderDto> {
    return await this.ordersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.Admin, UserRole.Maker, UserRole.Supplier)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<undefined> {
    await this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @Roles(UserRole.Admin)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<undefined> {
    await this.ordersService.remove(id);
  }
}
