import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { OrderController } from './order.controller';
import { Cart } from 'src/cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Cart])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}