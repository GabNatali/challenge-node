import {TaskNotFoundError} from "../../../domain/task/errors/TaskNotFoundError";
import {TaskRepository} from "../../../domain/task/repository/TaskRepository";
import {GetTaskResponseDTO} from "../dtos/GetTaskDTO";

export class GetTaskUseCase {
    constructor(private taskRepository: TaskRepository) {}
    async execute(taskId: string) : Promise<GetTaskResponseDTO> {
        const task = await this.taskRepository.findById(taskId);
        if (!task) throw new TaskNotFoundError();
        return {
            id: task.id,
            title: task.title,
            description: task.description || undefined,
            status: task.status,
            createdAt: task.createdAt.toISOString(),
        };
    }
}
