import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Use cookie-parser first
  app.use(cookieParser());

  // 2. ✅ Enable CORS for frontend origins
app.enableCors({
  origin: [
    'http://localhost:3000', // Development
    'https://fabricfinds.vercel.app', // Production frontend
    'https://fabricfinds-backend-production.up.railway.app', // Production backend
    'https://fabricfinds.vercel.app' // Your Vercel domain
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie'],
});

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 Server running on port: ${PORT}`);
}

bootstrap();