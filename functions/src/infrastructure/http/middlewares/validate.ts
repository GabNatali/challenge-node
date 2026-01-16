import {Request, Response, NextFunction} from "express";
import {z} from "zod";

export function validateBody(schema: z.ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid request body",
                issues: parsed.error.issues.map((i) => ({
                    path: i.path.join("."),
                    message: i.message,
                })),
            });
        }

        res.locals.body = parsed.data;
        return next();
    };
}

export function validateParams(schema: z.ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsed = schema.safeParse(req.params);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid route params",
                issues: parsed.error.issues.map((i) => ({
                    path: i.path.join("."),
                    message: i.message,
                })),
            });
        }
        res.locals.params = parsed.data;
        return next();
    };
}
