import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order-status.enum';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {

  // Mock the database with an in-memory store.
  private orders: Map<string, Order> = new Map();

  public async create(order: CreateOrderDto): Promise<undefined> {
    // Needs to generate the uuid in the proper way. For this proptotype is ok.
    const { randomUUID } = await import('node:crypto');
    const uuid = randomUUID()
    const date = new Date()
    this.orders.set(
      uuid,
      Object.assign({}, order, { id: uuid, created: date, updated: date })
    )
    return
  }

  public async findAll(): Promise<Order[]> {
    const orders = [];
    for (const [, order] of this.orders.entries()) {
      orders.push(order);
    }
    if (orders.length === 0) {
      throw new NotFoundException();
    }
    return orders;
  }

  public async findOne(id: string): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) {
      throw new NotFoundException();
    }
    return order;
  }
  
  public async update(id: string, updateOrderDto: UpdateOrderDto): Promise<undefined> {
    const order = this.orders.get(id);
    if (order) {
      const date = new Date();
      this.orders.set(order.id, Object.assign(order, updateOrderDto, { updated: date }));
      return
    }
    throw new NotAcceptableException();
  }

  public async remove(id: string): Promise<undefined>  {
    const order = this.orders.get(id);
    if (order && this.orders.delete(order.id)) {
      return
    }
    throw new NotAcceptableException();
  }
}
