import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCartItemsByEmail(email: string) {
    return this.prisma.cart.findMany({
      where: { email },
      include: { clothe: true }, // Includes related product info
    });
  }

  // You can add more cart-related methods here too (add, remove, etc.)
}
