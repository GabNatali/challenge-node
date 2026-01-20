import {Router} from "express";
import {AuthController} from "../controllers/auth/AuthController";
import {validateBody} from "../middlewares/validate";
import {LoginBodySchema} from "../schemas/auth/login.schema";
import {authMiddleware} from "../middlewares/authMiddleware";

export const buildAuthRouter = (controller: AuthController, jwtSecret: string): Router => {
    const router = Router();

    router.post("/auth/login", validateBody(LoginBodySchema), controller.login);
    router.post("/auth/loginWithToken", authMiddleware(jwtSecret), controller.loginWithToken);

    return router;
};
