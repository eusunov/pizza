import { IsUUID, IsArray, IsEnum, IsNumber, Min } from 'class-validator';
import { PurchaseDto } from './purchase.dto'
import { DeliveryAddressDto } from './delivery-address.dto'
import { OrderStatus } from '../order-status.enum'


export class CreateOrderDto {
  @IsUUID(4)
  userId: string;

  @IsArray()
  purchase: PurchaseDto[];

  deliveryAddress: DeliveryAddressDto;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNumber()
  @Min(0)
  totalBGN: number;
}
