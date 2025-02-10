import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

interface CustomJwtPayload extends jwt.JwtPayload {
    id: string;
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
        req.user = decoded; // ✅ req.user тепер точно має id
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
