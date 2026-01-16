import {TaskForbiddenError} from "../../../domain/task/errors/TaskForbiddenError";
import {TaskNotFoundError} from "../../../domain/task/errors/TaskNotFoundError";
import {TaskRepository} from "../../../domain/task/repository/TaskRepository";
import {UpdateTaskStatusRequestDTO, UpdateTaskStatusResponseDTO} from "../dtos/UpdateTaskStatusDTO";


export class UpdateTaskStatusUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}
    async execute(ownerId: string, taskId: string, newStatus: UpdateTaskStatusRequestDTO):
                                                                                Promise<UpdateTaskStatusResponseDTO> {
        const task = await this.taskRepository.findById(taskId);
        if (!task) throw new TaskNotFoundError();

        if (task.ownerId !== ownerId) throw new TaskForbiddenError();

        task.changeStatus(newStatus.status);

        await this.taskRepository.save(task);

        return {
            id: task.id,
            status: task.status,
            updatedAt: task.updatedAt.toISOString(),
        };
    }
}
