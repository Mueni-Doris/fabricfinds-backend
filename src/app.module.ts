import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { PrismaModule } from './prisma/prisma.module'; 
import { FabricsModule } from './fabrics/fabrics.module';
import { ClothesModule } from './clothes/clothes.module';
// import { OrdersModule } from './orders/orders.module';
import {ReportsModule} from './reports/reports.module';
import { CheckoutModule } from './checkout/module';


@Module({
  imports: [AuthModule,FabricsModule,ClothesModule, CartModule,ReportsModule, CheckoutModule, PrismaModule], // 👈 Add this line
})
export class AppModule {}

