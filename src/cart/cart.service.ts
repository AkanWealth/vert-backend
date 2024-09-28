import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) { }

  async addToCart(productId: number, quantity: number): Promise<Cart> {
    const product = await this.productRepository.findOne({ where: { id: productId } });
    const cartItem = this.cartRepository.create({ product, quantity });
    return this.cartRepository.save(cartItem);
  }

  findAll(): Promise<Cart[]> {
    return this.cartRepository.find({ relations: ['product'] });
  }

  deleteFromCart(id: number): Promise<void> {
    return this.cartRepository.delete(id).then(() => null);
  }
}