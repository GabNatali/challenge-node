import {NextFunction, Request, Response} from "express";
import {InvalidEmailError} from "../../../domain/user/errors/InvalidEmailError";
import {UserAlreadyExistsError} from "../../../domain/user/errors/UserAlreadyExistsError";
import {UserNotFoundError} from "../../../domain/user/errors/UserNotFoundError";

export function errorHandler(
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof InvalidEmailError) {
        return res.status(400).json({message: err.message});
    }

    if (err instanceof UserAlreadyExistsError) {
        return res.status(409).json({message: err.message});
    }
    if (err instanceof UserNotFoundError) {
        return res.status(404).json({message: err.message});
    }

    console.error(err);
    return res.status(500).json({message: "Internal server error"});
}
