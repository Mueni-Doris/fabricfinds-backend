import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  // 🔍 Get all clothes (reports)
  async getAllReports() {
    return this.prisma.clothes.findMany();
  }

  // 🔍 Get single item by ID
  async getItemById(id: number) {
    return this.prisma.clothes.findUnique({
      where: { id },
    });
  }

  // 🔁 Update quantity
  async updateQuantity(id: number, quantity: number) {
    return this.prisma.clothes.update({
      where: { id },
      data: {
        quantity, // 👌 shorthand works perfectly
      },
    });
  }

  // ❌ Remove item by ID
  async removeItem(id: number) {
    return this.prisma.clothes.delete({
      where: { id },
    });
  }
}
