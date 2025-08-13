import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';

@Controller()
class AppController {
  @Get('health')
  getHealth() {
    return { status: 'ok', time: new Date().toISOString() };
  }
}

@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Allow all CORS (just for testing)
  app.enableCors({ origin: '*', credentials: true });

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`✅ App running on ${await app.getUrl()}`);
}

bootstrap();
