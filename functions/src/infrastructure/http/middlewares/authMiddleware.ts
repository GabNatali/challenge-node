import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

export type AuthPayload = { sub: string; email: string; iat: number; exp: number };

export function authMiddleware(secret: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const header = req.headers.authorization ?? "";

        if (!header) return res.status(401).json({message: "Unauthorized"});

        const [type, token] = header.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(401).json({message: "Unauthorized"});
        }

        try {
            const payload = jwt.verify(token, secret) as AuthPayload;
            (req as any).auth = payload;
            return next();
        } catch {
            return res.status(401).json({message: "Invalid token"});
        }
    };
}
