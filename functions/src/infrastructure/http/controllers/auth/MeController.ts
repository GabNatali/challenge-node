import {Request, Response, NextFunction} from "express";
import {GetMeUseCase} from "../../../../application/auth/use-cases/GetMeUseCase";


export class MeController {
    constructor(private readonly getMeUseCase: GetMeUseCase) {}
    me = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const auth = (req as any).auth;
            const userId = auth?.sub as string;

            const output = await this.getMeUseCase.execute(userId);
            return res.status(200).json(output);
        } catch (err) {
            return next(err);
        }
    };
}
