import { IsUUID, IsDate } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types'

import { CreateOrderDto } from './create-order.dto'

class AdditionalOrderInfo {
  @IsUUID(4)
  id: string;

  @IsDate()
  created: Date;

  @IsDate()
  updated: Date;
}

export class OrderDto extends IntersectionType(
  CreateOrderDto,
  AdditionalOrderInfo,
) {}
