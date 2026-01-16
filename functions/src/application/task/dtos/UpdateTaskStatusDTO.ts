import {TaskStatus} from "../../../domain/task/value-objects/TaskStatus";


export type UpdateTaskStatusRequestDTO = {
    status: TaskStatus;
};

export type UpdateTaskStatusResponseDTO = {
    id: string;
    status: TaskStatus;
    updatedAt: string;
};
