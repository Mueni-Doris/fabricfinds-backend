import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
    },
  }),
);



  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://fabricfinds.vercel.app', 
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // ✅ allow all necessary verbs
    allowedHeaders: ['Content-Type', 'Authorization'],   // ✅ allow preflighted headers
  });

  // // ✅ Explicitly respond to preflight OPTIONS requests
  // app.getHttpAdapter().getInstance().options('*', (_, resquest) => {
  //   res.sendStatus(200);
  // });
    const PORT = process.env.PORT || 3001;


await app.listen(PORT, '0.0.0.0');}

bootstrap();