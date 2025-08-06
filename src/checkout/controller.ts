import {
  Controller,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CartService } from '../cart/cart.service';

@Controller()
export class CheckoutController {
  constructor(private readonly cartService: CartService) {}

  @Get('check-session')
  checkSession(@Req() req: Request) {
    console.log('Session check:', req.session.user);
    return {
      loggedIn: !!req.session.user,
      user: req.session.user || null,
    };
  }

  @Get('checkout')
  async checkout(@Req() req: Request, @Res() res: Response) {
    try {
      const user = req.session.user;
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized. Please log in.',
        });
      }

      const { email, phone_number, address } = user;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email not found in session.',
        });
      }
      
      const items = await this.cartService.getCartItemsByEmail(email);
      

      const updatedItems = items.map((item) => {
        const price = typeof item.clothe.price === 'object' && 'toNumber' in item.clothe.price
          ? item.clothe.price.toNumber()
          : parseFloat(item.clothe.price as any);

        const total_price = price * item.quantity;

        return {
          ...item,
          clothe: {
            ...item.clothe,
            price,
          },
          total_price,
        };
      });

      return res.json({
        success: true,
        user,
        items: updatedItems,
      });
    } catch (err) {
      console.error('Checkout error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error during checkout',
      });
    }
  }
}
