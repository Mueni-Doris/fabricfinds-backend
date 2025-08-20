import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser'; // 👈 Highly recommended addition

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Use cookie-parser first (highly recommended for session cookies)
  app.use(cookieParser());

  // 2. ✅ Enable CORS for frontend origins - Configure this FIRST
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://fabricfinds.vercel.app',
    ],
    credentials: true, // This is the most important setting
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Set-Cookie'], // 👈 Added cookie headers
  });

  // 3. ✅ Session middleware - Apply AFTER CORS is configured
  app.use(
    session({
      name: 'fabricfinds.sid', // 👈 Good practice to set a specific name
      secret: process.env.SESSION_SECRET || 'supersecretkey',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        httpOnly: true,
        sameSite: 'none', // ✅ Correct for cross-site
        secure: true, // ✅ Correct for production
        // Optional: explicitly set the domain if you have subdomains later
        // domain: '.yourdomain.com'
      },
    }),
  );

  const PORT = process.env.PORT || 3001;
  await app.listen(PORT, '0.0.0.0');
  console.log(`🚀 Server running on port: ${PORT}`);
}

bootstrap();