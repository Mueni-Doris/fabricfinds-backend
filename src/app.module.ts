import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { PrismaModule } from './prisma/prisma.module'; 
import { FabricsModule } from './fabrics/fabrics.module';
import { ClothesModule } from './clothes/clothes.module';
import { ReportsModule } from './reports/reports.module';
import { CheckoutModule } from './checkout/module';
import { SessionMiddleware } from './session.middleware';
import { PrismaService } from './prisma/prisma.service';

// 👇 Import your AppController and AppService
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  // 👇 Add these lines to register your controller and services
  controllers: [AppController], // This makes the debug endpoints available
  providers: [AppService, PrismaService], // This provides the services
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SessionMiddleware)
      .forRoutes('*'); // Apply to all routes
  }
}