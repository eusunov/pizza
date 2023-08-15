import { IsUUID, IsNumber, Min } from 'class-validator';

export class PurchaseDto {
  @IsUUID(4)
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  priceBGN: number;
}
