import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'your_super_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        sameSite: 'lax',
      },
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://fabricfinds.vercel.app/'
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001, '0.0.0.0');
}
bootstrap();
