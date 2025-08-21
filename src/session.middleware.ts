import { Injectable, NestMiddleware } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // First apply cookie-parser
    cookieParser()(req, res, () => {
      // Then apply session
      session({
        secret: process.env.SESSION_SECRET || '722e32873a42290200df042c0c451d6d15097b0f6598ba205e1df241562af806',
        resave: false,
        saveUninitialized: false,
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