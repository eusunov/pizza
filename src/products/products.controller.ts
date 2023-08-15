import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Public } from '../auth/decorators/public.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Public()
  async findAll(): Promise<Product[]>{
    return await this.productsService.findAll();
  }

  // TODO: The rest of the routes
}
