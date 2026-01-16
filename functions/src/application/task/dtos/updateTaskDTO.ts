import {TaskStatus} from "../../../domain/task/value-objects/TaskStatus";


export type UpdateTaskRequestDTO = {
    title?: string;
    description?: string;
};


export type UpdateTaskResponseDTO = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: string;
    updatedAt: string;
};
