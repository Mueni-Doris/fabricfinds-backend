import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Use cookie-parser first
  app.use(cookieParser());

  // 2. ✅ Enable CORS for frontend origins with proper typing
  app.enableCors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      // Allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);
      
      // Allow localhost and all Vercel domains
      if (
        origin.includes('localhost:3000') ||
        origin.includes('.vercel.app') ||
        origin.includes('fabricfinds-backend-production.up.railway.app')
      ) {
        return callback(null, true);
      }
      
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie'],
  });

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 Server running on port: ${PORT}`);
}

bootstrap();