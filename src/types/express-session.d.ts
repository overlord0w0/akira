import { Request } from 'express';
import session from 'express-session';

declare module 'express-session' {
    interface SessionData {
        user?: { id: string };
    }
}

export interface AuthRequest extends Request {
    session: session.Session & Partial<session.SessionData>;
}
