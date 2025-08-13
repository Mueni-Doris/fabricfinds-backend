import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const server = app.getHttpAdapter().getInstance();
  server.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`✅ Application is running on: ${await app.getUrl()}`);
  console.log(`✅ Health check endpoint available at: /health`);

  setTimeout(async () => {
    console.log('⚙️ Starting heavy init...');
    try {
      // Heavy startup logic here
      console.log('✅ Heavy init done');
    } catch (err) {
      console.error('❌ Heavy init failed', err);
    }
  }, 0);
}

bootstrap();
