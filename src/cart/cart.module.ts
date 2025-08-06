import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from '../prisma/prisma.module'; // ✅ import PrismaModule


@Module({
  imports: [PrismaModule], // ✅ tell NestJS where PrismaService lives
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}


