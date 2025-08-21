import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private prisma = new PrismaClient();
  private sessionStore = new PrismaSessionStore(this.prisma as any, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
  });

  use(req: any, res: any, next: () => void) {
    cookieParser()(req, res, () => {
      session({
        secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
        resave: false,
        saveUninitialized: false,
        store: this.sessionStore,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24, // 1 day
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          // ✅ ADDED domain setting for production
          domain: process.env.NODE_ENV === 'production' 
            ? '.railway.app' 
            : undefined
        },
        name: 'fabricfinds.sid' // ✅ Added specific cookie name
      })(req, res, next);
    });
  }
}