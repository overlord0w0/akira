import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

interface CustomJwtPayload extends JwtPayload {
    id: string; // Явно додаємо id
}

declare module "express-serve-static-core" {
    interface Request {
        user?: CustomJwtPayload; // req.user тепер має id
    }
}
