import { Module } from '@nestjs/common';
import { FabricsController } from './fabrics.controller';
import { FabricsService } from './fabrics.service';

@Module({
  controllers: [FabricsController], // handles routes
  providers: [FabricsService],      // handles business logic
})
export class FabricsModule {}
