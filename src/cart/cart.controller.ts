import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  addToCart(@Body() body: { productId: number; quantity: number }) {
    return this.cartService.addToCart(body.productId, body.quantity);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Delete(':id')
  removeFromCart(@Param('id') id: number) {
    return this.cartService.deleteFromCart(id);
  }
}