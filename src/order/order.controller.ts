import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() body: { cartIds: number[] }) {
    return this.orderService.createOrder(body.cartIds);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
}