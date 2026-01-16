import {TaskStatus} from "../../../domain/task/value-objects/TaskStatus";

export type CreateTaskRequestDTO = {
    title: string;
    description: string;
};

export type CreateTaskResponseDTO = {
    id: string;
    title: string;
    description: string;
    ownerId: string;
    status: TaskStatus;
    createdAt: string;
};
