import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { PrismaService } from './prisma/prisma.service'; // 👈 Import PrismaService
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  private sessionStore: any;

  // 👇 Inject PrismaService through constructor
  constructor(private prismaService: PrismaService) {
    this.sessionStore = new PrismaSessionStore(this.prismaService as any, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    });
  }

  use(req: any, res: any, next: () => void) {
    cookieParser()(req, res, () => {
      session({
        secret: process.env.SESSION_SECRET || '722e32873a42290200df042c0c451d6d15097b0f6598ba205e1df241562af806et',
        resave: false,
        saveUninitialized: false,
        store: this.sessionStore,
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