import 'express-session';
import { Request } from 'express';

declare module 'express-session' {
    interface SessionData {
        userId?: string;
    }
}

export interface AuthRequest extends Request {
    session: SessionData;
}