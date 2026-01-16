import {Router} from "express";
import {AuthController} from "../controllers/auth/AuthController";
import {validateBody} from "../middlewares/validate";
import {LoginBodySchema} from "../schemas/auth/login.schema";

export const buildAuthRouter = (controller: AuthController): Router => {
    const router = Router();

    router.post("/auth/login", validateBody(LoginBodySchema), controller.login);

    return router;
};
