import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user: {
      email: string;
      phone_number?: string;
      location?: string;
      address?: string;      
    };
  }
}

declare module 'express-serve-static-core' {
  interface Request {
    session: session.Session & Partial<session.SessionData>;
    sessionID: string;
  }
}
