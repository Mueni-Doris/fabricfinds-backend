import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClothesService {
  constructor(private prisma: PrismaService) {}

  async createClothes(data: Prisma.clothesCreateInput) {
    return this.prisma.clothes.create({ data });
  }
}
