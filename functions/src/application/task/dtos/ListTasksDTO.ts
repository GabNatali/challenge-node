import {TaskStatus} from "../../../domain/task/value-objects/TaskStatus";


export type ListTasksResponseDTO = Array<{
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    createdAt: string;
}>;
