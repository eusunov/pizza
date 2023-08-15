// To adapt for usage with the database ORM
import { OrderStatus } from '../order-status.enum'
import { Purchase } from './purchase.entity'
import { DeliveryAddress } from './delivery-address.entity'

export class Order {
  id: string;
  userId: string;
  purchase: Purchase[];
  status: OrderStatus;
  deliveryAddress: DeliveryAddress;
  totalBGN: number;
  created: Date;
  updated: Date;
}
