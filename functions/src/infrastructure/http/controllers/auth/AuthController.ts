import {Request, Response, NextFunction} from "express";
import {LoginUserUseCase} from "../../../../application/auth/use-cases/LoginUserUseCase";
import {LoginRequestDTO} from "../../../../application/auth/dto/LoginDTO";


export class AuthController {
    constructor( private readonly loginUserUseCase: LoginUserUseCase) {}

    login = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const email = res.locals.body as LoginRequestDTO;
            const output = await this.loginUserUseCase.execute(email);
            return res.status(200).json(output);
        } catch (err) {
            return next(err);
        }
    };
}
