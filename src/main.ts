import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookie parser
  app.use(cookieParser());

  // Sessions (use your real SESSION_SECRET in Railway env vars)
  app.use(
    session({
      secret: process.env.SESSION_SECRET || '722e32873a42290200df042c0c451d6d15097b0f6598ba205e1df241562af806et',
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === 'production', // true in prod
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
      },
    }),
  );

  // Enable CORS if frontend is separate
  app.enableCors({
    origin: process.env.CLIENT_URL || 'https://fabricfinds.vercel.app',
    credentials: true,
  });

  // This is key for Railway
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
