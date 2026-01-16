import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import {MeController} from "../controllers/auth/MeController";

export const buildMeRouter = (controller: MeController, jwtSecret: string) => {
    const router = Router();

    router.get("/me", authMiddleware(jwtSecret), controller.me);

    return router;
};
