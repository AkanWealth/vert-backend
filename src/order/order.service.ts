import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/cart/entities/cart.entity';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) { }

  async createOrder(cartIds: number[]): Promise<Order> {
    // Fetch cart items by their IDs using `findBy` with `In` operator
    const cartItems = await this.cartRepository.find({
      where: {
        id: In(cartIds),
      },
      relations: ['product'], // Specify relations to include
    });

    // Calculate the total amount based on product price and quantity
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    // Create a new order
    const newOrder = this.orderRepository.create({
      cart: cartItems,
      totalAmount,
    });

    // Save and return the new order
    return this.orderRepository.save(newOrder);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['cart', 'cart.product'] });
  }
}