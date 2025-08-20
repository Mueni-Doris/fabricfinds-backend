import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { PrismaModule } from './prisma/prisma.module'; 
import { FabricsModule } from './fabrics/fabrics.module';
import { ClothesModule } from './clothes/clothes.module';
import { ReportsModule } from './reports/reports.module';
import { CheckoutModule } from './checkout/module';
import { SessionModule } from 'nestjs-session'; // 👈 Import the SessionModule

@Module({
  imports: [
    // Configure Session FIRST
    SessionModule.forRoot({
      session: {
        secret: process.env.SESSION_SECRET || '722e32873a42290200df042c0c451d6d15097b0f6598ba205e1df241562af806',
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24, // 1 day
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        },
      },
    }),
    
    // Your existing modules
    AuthModule,
    FabricsModule,
    ClothesModule, 
    CartModule,
    ReportsModule,
    CheckoutModule, 
    PrismaModule,
  ],
})
export class AppModule {}