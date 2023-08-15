import { Injectable, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { Product } from './entities/product.entity';

// TODO
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';


@Injectable()
export class ProductsService {

  // Mock the database with an in-memory store.
  private products: Map<string, Product> = new Map();

  // Mock the database initial setup with some product entries
  constructor() {
    const date = new Date()
    this.products.set('7733f582-2a64-4040-9e04-fbd3f6e28af3', {
      id: '7733f582-2a64-4040-9e04-fbd3f6e28af3',
      name: 'Margarita',
      category: 'Pizza',
      ingredients: 'cheese, tomapto, oregano',
      weightGramm: 330,
      priseBGN: 12.99,
      created: date,
      updated: date,
      active: true,
    })
    this.products.set('ca8ac377-be4f-4ceb-9496-7e7e0c982481', {
      id: 'ca8ac377-be4f-4ceb-9496-7e7e0c982481',
      name: 'Capriciosa',
      category: 'Pizza',
      ingredients: 'cheese, tomapto, oregano, ham, mushrooms',
      weightGramm: 390,
      priseBGN: 16.99,
      created: date,
      updated: date,
      active: true,
    })
    this.products.set('ca8ac377-be4f-4ceb-9496-7e7e0c982481', {
      id: 'ca8ac377-be4f-4ceb-9496-7e7e0c982481',
      name: 'Staropramen',
      category: 'beer',
      ingredients: 'hops, water',
      volumeLiter: 0.330,
      priseBGN: 3.50,
      created: date,
      updated: date,
      active: true,
    })
  }

  public async findAll(): Promise<Product[]> {
    const products = [];
    for (const [, product] of this.products.entries()) {
      products.push(product);
    }
    if (products.length === 0) {
      throw new NotFoundException();
    }
    return products;
  }

  // TODO
  // public async create(product: CreateProductDto): Promise<undefined> {}
  // public async findOne(id: string): Promise<Product> {}
  // public async update(id: string, updateProductDto: UpdateProductDto): Promise<undefined> {}
  // public async remove(id: string): Promise<undefined>  {}

}
