import { PickType } from '@nestjs/mapped-types'

import { CreateOrderDto } from '../dto/create-order.dto'

export class UpdateOrderDto extends PickType(CreateOrderDto, ['status'] as const) {}
