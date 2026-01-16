import {TaskStatus} from "../../../domain/task/value-objects/TaskStatus";


export type GetTaskResponseDTO = {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: string;
}
