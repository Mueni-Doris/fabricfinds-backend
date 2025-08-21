import {
  Controller,
  Post,
  Body,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: {
      email: string;
      password: string;
      full_name: string;
      phone_number: string;
      username: string;
      role: string;
      location: string;
    }
  ) {
    const userData = {
      ...body,
      phone_number: parseInt(body.phone_number, 10),
    };
    return this.authService.register(userData);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Req() req: Request
  ) {
    try {
      const result = await this.authService.login(body.email, body.password);

      if (result.success && result.user) {
        const { email, phone_number, location } = result.user;

        // 🚀 FIX: Set session data directly - no manual save needed
        req.session.user = {
          email,
          phone_number: String(phone_number),
          location,
        };

        // ✅ REMOVED the problematic manual session saving
        // Express-session automatically saves when response is sent
      }

      return result;
    } catch (error) {
      console.error('Login controller error:', error);
      return { 
        success: false, 
        message: 'Login failed due to server error' 
      };
    }
  }

  @Get('check-session')
  checkSession(@Req() req: Request) {
    const user = req.session.user;
    return {
      loggedIn: !!user,
      user: user || null,
      phone_number: user?.phone_number || null,
      location: user?.location || null,
    };
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    try {
      return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
          if (err) {
            console.error('Logout error:', err);
            return reject({ success: false, message: 'Logout failed' });
          }
          // ✅ Clear the session cookie
          if (req.res) {
            req.res.clearCookie('connect.sid', {
              path: '/',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            });
          }
          resolve({ success: true, message: 'Logged out successfully' });
        });
      });
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, message: 'Logout failed' };
    }
  }
}