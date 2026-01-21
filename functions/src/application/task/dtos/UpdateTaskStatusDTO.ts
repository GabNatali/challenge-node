import {TaskStatus} from "../../../domain/task/value-objects/TaskStatus";


export type UpdateTaskStatusRequestDTO = {
    status: TaskStatus;
};

