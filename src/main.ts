import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Parse cookies
  app.use(cookieParser());

  // Session middleware (use SESSION_SECRET in Railway env vars)
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'fallback_secret_change_me',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production', // send only over HTTPS in prod
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    }),
  );

  // CORS config — no trailing slash in origin
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://fabricfinds.vercel.app',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Listen on the Railway port
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

bootstrap();
