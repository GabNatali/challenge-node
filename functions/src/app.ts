import express from "express";
import {buildServer} from "./infrastructure/http/server";

import {buildUserRouter} from "./infrastructure/http/routes/user.routes";
import {buildAuthRouter} from "./infrastructure/http/routes/auth.routes";
import {buildTaskRouter} from "./infrastructure/http/routes/task.routes";

import {UserController} from "./infrastructure/http/controllers/user/UserController";
import {AuthController} from "./infrastructure/http/controllers/auth/AuthController";
import {TaskController} from "./infrastructure/http/controllers/task/taskController";

import {FirestoreUserRepository} from "./infrastructure/persistence/FirestoreUserRepository";
import {FirestoreTaskRepository} from "./infrastructure/persistence/FirestoreTaskRepository";

import {RegisterUserUseCase} from "./application/user/use-cases/RegisterUserUseCase";
import {LoginUserUseCase} from "./application/auth/use-cases/LoginUserUseCase";

import {CreateTaskUseCase} from "./application/task/use-cases/CreateTaskUseCase";
import {ListTasksUseCase} from "./application/task/use-cases/ListTasksUseCase";
import {UpdateTaskUseCase} from "./application/task/use-cases/UpdateTaskUseCase";
import {UpdateTaskStatusUseCase} from "./application/task/use-cases/UpdateTaskStatusUseCase";
import {DeleteTaskUseCase} from "./application/task/use-cases/DeleteTaskUseCase";

import {UuidGenerator} from "./shared/utils/UuidGenerator";
import {JwtSignerJsonwebtoken} from "./infrastructure/security/JwtSignerJsonwebtoken";
import {GetTaskUseCase} from "./application/task/use-cases/GetTaskUseCase";
import {LoginByUserIdUseCase} from "./application/auth/use-cases/LoginByUserId";

export function createApp(): express.Express {
    const JWT_SECRET = process.env.JWT_SECRET as string;

    const jwtSigner = new JwtSignerJsonwebtoken(JWT_SECRET, "1h");
    const idGen = new UuidGenerator();

    const userRepo = new FirestoreUserRepository();
    const taskRepo = new FirestoreTaskRepository();

    const registerUserUseCase = new RegisterUserUseCase(userRepo, idGen, jwtSigner);
    const userController = new UserController(registerUserUseCase);
    const userRouter = buildUserRouter(userController);

    const loginUserUseCase = new LoginUserUseCase(userRepo, jwtSigner);
    const loginByUserIdUseCase = new LoginByUserIdUseCase(userRepo, jwtSigner);

    const authController = new AuthController(loginUserUseCase, loginByUserIdUseCase);
    const authRouter = buildAuthRouter(authController, JWT_SECRET);

    const createTaskUseCase = new CreateTaskUseCase(taskRepo, idGen);
    const listTasksUseCase = new ListTasksUseCase(taskRepo);
    const updateTaskUseCase = new UpdateTaskUseCase(taskRepo);
    const updateTaskStatusUseCase = new UpdateTaskStatusUseCase(taskRepo);
    const deleteTaskUseCase = new DeleteTaskUseCase(taskRepo);
    const getTaskUsecase = new GetTaskUseCase(taskRepo);

    const taskController = new TaskController(
        createTaskUseCase,
        getTaskUsecase,
        listTasksUseCase,
        updateTaskUseCase,
        updateTaskStatusUseCase,
        deleteTaskUseCase
    );
    const taskRouter = buildTaskRouter(taskController, JWT_SECRET);

    return buildServer({
        authRouter,
        userRouter,
        taskRouter,
    });
}
