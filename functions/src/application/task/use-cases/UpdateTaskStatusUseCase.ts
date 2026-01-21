import {TaskForbiddenError} from "../../../domain/task/errors/TaskForbiddenError";
import {TaskNotFoundError} from "../../../domain/task/errors/TaskNotFoundError";
import {TaskRepository} from "../../../domain/task/repository/TaskRepository";
import {UpdateTaskResponseDTO} from "../dtos/updateTaskDTO";
import {UpdateTaskStatusRequestDTO} from "../dtos/UpdateTaskStatusDTO";


export class UpdateTaskStatusUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}
    async execute(ownerId: string, taskId: string, newStatus: UpdateTaskStatusRequestDTO):
                                                                                Promise<UpdateTaskResponseDTO> {
        const task = await this.taskRepository.findById(taskId);
        if (!task) throw new TaskNotFoundError();

        if (task.ownerId !== ownerId) throw new TaskForbiddenError();

        task.changeStatus(newStatus.status);

        await this.taskRepository.save(task);

        return {
            id: task.id,
            title: task.title,
            description: task.description,
            createdAt: task.createdAt.toISOString(),
            status: task.status,
            updatedAt: task.updatedAt.toISOString(),
        };
    }
}
