import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { Decimal } from '@prisma/client/runtime/library';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // ✅ GET /cart
  @Get()
  async getCart(@Req() req: Request) {
    const email = req.session.user?.email;
    if (!email) return { success: false, message: 'Not logged in' };

    const cart = await this.cartService.getCart(email);

    // Convert Decimal -> number
    const safeCart = cart.map((item: any) => ({
      ...item,
      price: item.price.toNumber(),
    }));
    

    return { success: true, cart: safeCart };
  }

  // ✅ POST /cart/add
  @Post('add')
  async addItem(@Req() req: Request, @Body() body: any) {
    const email = req.session.user?.email;
    if (!email) return { success: false, message: 'Not logged in' };
    

    const item = await this.cartService.addItem({
      description: body.description,
      price: Number(body.price),
      image: body.image,
      quantity: Number(body.quantity),
      clothe_id: Number(body.clothe_id),
      email,
    });

    return { success: true, item };
  }

  // ✅ PATCH /cart/update/:id
  @Patch('update/:id')
  async updateQuantity(
    @Param('id') id: string,
    @Body() body: { quantity: number }
  ) {
    const item = await this.cartService.getItemById(Number(id));
    if (!item) {
      return { success: false, message: 'Item not found' };
    }

    const unitPrice = (item.price as Decimal).toNumber() / item.quantity;
    const newPrice = unitPrice * body.quantity;

    const updatedItem = await this.cartService.updateQuantityAndPrice(
      Number(id),
      body.quantity,
      newPrice
    );

    return {
      success: true,
      item: {
        ...updatedItem,
        price: (updatedItem.price as Decimal).toNumber(),
      },
    };
  }

  // ✅ DELETE /cart/remove/:id
  @Delete('remove/:id')
  async removeItem(@Param('id') id: string) {
    await this.cartService.removeItem(Number(id));
    return { success: true, message: 'Item removed' };
  }

  // ✅ DELETE /cart/clear
  @Delete('clear')
  async clearCart(@Req() req: Request) {
    const email = req.session.user?.email;
    if (!email) return { success: false, message: 'Not logged in' };
    await this.cartService.clearCart(email);
    return { success: true, message: 'Cart cleared' };
  }
}
