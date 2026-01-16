import {Router} from "express";
import {authMiddleware} from "../middlewares/authMiddleware";
import {validateBody, validateParams} from "../middlewares/validate";
import {CreateTaskBodySchema} from "../schemas/task/createTask.schema";
import {TaskController} from "../controllers/task/taskController";
import {TaskParamsSchema} from "../schemas/task/taskParams.schema";
import {UpdateTaskBodySchema} from "../schemas/task/updateTask.schema";
import {UpdateTaskStatusBodySchema} from "../schemas/task/updateTaskStatus.schema";


export function buildTaskRouter(controller: TaskController, jwtSecret: string) {
    const router = Router();

    router.use(authMiddleware(jwtSecret));
    router.get("/tasks", controller.list);
    router.get("/tasks/:id", validateParams(TaskParamsSchema), controller.get);
    router.post("/tasks", validateBody(CreateTaskBodySchema), controller.create);
    router.patch("/tasks/:id", validateParams(TaskParamsSchema), validateBody(UpdateTaskBodySchema), controller.update);
    router.patch("/tasks/:id/status",
        validateParams(TaskParamsSchema), validateBody(UpdateTaskStatusBodySchema), controller.updateStatus );
    router.delete("/tasks/:id", validateParams(TaskParamsSchema), controller.delete);

    return router;
}

