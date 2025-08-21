import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private prisma = new PrismaClient();
  
  // Use type assertion to fix the TypeScript error
  private sessionStore = new PrismaSessionStore(this.prisma as any, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
  });

  use(req: any, res: any, next: () => void) {
    console.log('SessionMiddleware applied to request');
    
    cookieParser()(req, res, () => {
      session({
        secret: process.env.SESSION_SECRET || '722e32873a42290200df042c0c451d6d15097b0f6598ba205e1df241562af806et',
        resave: false,
        saveUninitialized: false,
        store: this.sessionStore, // ✅ This should work now
        cookie: {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        },
      })(req, res, next);
    });
  }
}