import {Request, Response, NextFunction, RequestHandler} from "express";
import {RegisterUserUseCase} from "../../../../application/user/use-cases/RegisterUserUseCase";

export class UserController {
    constructor(private readonly registerUserUseCase: RegisterUserUseCase) { }

    register:RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {email} = res.locals.body as { email: string };

            const output = await this.registerUserUseCase.execute({email});

            return res.status(201).json(output);
        } catch (err) {
            return next(err);
        }
    };
}
