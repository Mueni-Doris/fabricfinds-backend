import { Module } from '@nestjs/common';
import { CheckoutController } from './controller';


import { CartService } from '../cart/cart.service';
import { PrismaService } from '../prisma/prisma.service'; // ✅

@Module({
  controllers: [CheckoutController],
  providers: [CartService, PrismaService],
})
export class CheckoutModule {}
