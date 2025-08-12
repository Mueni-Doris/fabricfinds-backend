import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Session middleware
  app.use(
    session({
      secret: '722e32873a42290200df042c0c451d6d15097b0f6598ba205e1df241562af806',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        sameSite: 'lax',
      },
    }),
  );

  // CORS configuration
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://fabricfinds.vercel.app', // 🚫 no trailing slash
    ],
    credentials: true,
  });

  // Listen on the Railway-assigned port or default to 3001 locally
  await app.listen(process.env.PORT || 3001, '0.0.0.0');
}

bootstrap();
