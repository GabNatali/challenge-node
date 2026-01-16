import {Request, Response, NextFunction} from "express";
import {CreateTaskUseCase} from "../../../../application/task/use-cases/CreateTaskUseCase";
import {DeleteTaskUseCase} from "../../../../application/task/use-cases/DeleteTaskUseCase";
import {UpdateTaskStatusUseCase} from "../../../../application/task/use-cases/UpdateTaskStatusUseCase";
import {UpdateTaskUseCase} from "../../../../application/task/use-cases/UpdateTaskUseCase";
import {ListTasksUseCase} from "../../../../application/task/use-cases/ListTasksUseCase";
import {CreateTaskRequestDTO} from "../../../../application/task/dtos/CreateTaskDTO";
import {UpdateTaskRequestDTO} from "../../../../application/task/dtos/updateTaskDTO";
import {UpdateTaskStatusRequestDTO} from "../../../../application/task/dtos/UpdateTaskStatusDTO";
import {GetTaskUseCase} from "../../../../application/task/use-cases/GetTaskUseCase";

type Auth = { sub: string; email?: string };

export class TaskController {
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly getTaskUseCase: GetTaskUseCase,
        private readonly ListTaskUseCase: ListTasksUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
        private readonly updateTaskStatusUseCase: UpdateTaskStatusUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
    ) {}

    create = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const auth = (req as any).auth as Auth;
            const ownerId = auth.sub;

            const body = res.locals.body as CreateTaskRequestDTO;

            const task = await this.createTaskUseCase.execute(ownerId, body);
            return res.status(201).json(task);
        } catch (err) {
            return next(err);
        }
    };

    get = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {id} = res.locals.params as { id: string };

            const task = await this.getTaskUseCase.execute(id);
            return res.status(200).json(task);
        } catch (err) {
            return next(err);
        }
    };

    list = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const auth = (req as any).auth as Auth;
            const ownerId = auth.sub;

            const tasks = await this.ListTaskUseCase.execute(ownerId);
            return res.status(200).json(tasks);
        } catch (err) {
            return next(err);
        }
    };

    update = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const auth = (req as any).auth as Auth;
            const ownerId = auth.sub;

            const {id} = res.locals.params as { id: string };

            const body = (res.locals.body) as UpdateTaskRequestDTO;
            const task = await this.updateTaskUseCase.execute(ownerId, id, body);
            return res.status(200).json(task);
        } catch (err) {
            return next(err);
        }
    };

    updateStatus = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const auth = (req as any).auth as Auth;
            const ownerId = auth.sub;
            const {id} = res.locals.params as { id: string };

            const body = res.locals.body as UpdateTaskStatusRequestDTO;
            const task = await this.updateTaskStatusUseCase.execute(ownerId, id, body);
            return res.status(200).json(task);
        } catch (err) {
            return next(err);
        }
    };

    delete = async (req:Request, res:Response, next:NextFunction) => {
        try {
            const auth = (req as any).auth as Auth;
            const ownerId = auth.sub;

            const {id} = res.locals.params as { id: string };

            await this.deleteTaskUseCase.execute(ownerId, id);
            return res.status(204).send();
        } catch (err) {
            return next(err);
        }
    };
}
