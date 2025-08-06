// src/auth/auth.controller.ts
import {
    Controller,
    Post,
    Body,
    Req,
    Get
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { Request } from 'express';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    // 🧾 Login route already good
  
    // ✅ Add this check-session route
    @Get('check-session')
    checkSession(@Req() req: Request) {
      console.log('Session check:', req.session.user);
      return {
        loggedIn: !!req.session.user,
        user: req.session.user || null,
      };
    }
  }
  