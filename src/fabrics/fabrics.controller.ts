import { Controller, Get } from '@nestjs/common';
import { FabricsService } from './fabrics.service';

@Controller('fabrics')
export class FabricsController {
  constructor(private readonly fabricsService: FabricsService) {}

  @Get()
  async getAllFabrics() {
    return this.fabricsService.getAllClothes();
  }
}
