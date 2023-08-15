import { MinLength } from 'class-validator';

export class DeliveryAddressDto {
  @MinLength(5)
  street: string;

  @MinLength(5)
  city: string;

}
