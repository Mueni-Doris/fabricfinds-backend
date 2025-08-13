import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Simple CORS so Postman/browser can hit it
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // Health check endpoint (always returns OK)
  app.getHttpAdapter().get('/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // IMPORTANT: Listen on 0.0.0.0 for Railway
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
