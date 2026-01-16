import {Router} from "express";
import {UserController} from "../controllers/user/UserController";
import {validateBody} from "../middlewares/validate";
import {RegisterBodySchema} from "../schemas/user/registerUser.schema";

export const buildUserRouter = (controller: UserController): Router => {
    const router = Router();

    router.post("/users", validateBody(RegisterBodySchema), controller.register);

    return router;
};
