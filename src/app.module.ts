import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { PrismaModule } from './prisma/prisma.module'; 
import { FabricsModule } from './fabrics/fabrics.module';
import { ClothesModule } from './clothes/clothes.module';
import { ReportsModule } from './reports/reports.module';
import { CheckoutModule } from './checkout/module';
import { SessionMiddleware } from './session.middleware'; // 👈 Import the middleware

@Module({
  imports: [
    AuthModule,
    FabricsModule,
    ClothesModule, 
    CartModule,
    ReportsModule,
    CheckoutModule, 
    PrismaModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}