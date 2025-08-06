import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FabricsService {
  constructor(private prisma: PrismaService) {}

  async getAllClothes() {
    return this.prisma.clothes.findMany(); // Adjust model name if not `fabric`
  }
}
