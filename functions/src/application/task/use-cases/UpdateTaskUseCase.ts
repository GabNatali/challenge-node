import {TaskForbiddenError} from "../../../domain/task/errors/TaskForbiddenError";
import {TaskNotFoundError} from "../../../domain/task/errors/TaskNotFoundError";
import {TaskRepository} from "../../../domain/task/repository/TaskRepository";
import {UpdateTaskRequestDTO, UpdateTaskResponseDTO} from "../dtos/updateTaskDTO";


export class UpdateTaskUseCase {
    constructor( private readonly taskRepository: TaskRepository) {}

    async execute(ownerId: string, taskId : string, input: UpdateTaskRequestDTO): Promise<UpdateTaskResponseDTO> {
        const task = await this.taskRepository.findById(taskId);
        if (!task) throw new TaskNotFoundError();

        if (task.ownerId !== ownerId) throw new TaskForbiddenError();

        task.updateTask(input);

        await this.taskRepository.save(task);
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            status: task.status,
            createdAt: task.createdAt.toISOString(),
            updatedAt: task.updatedAt.toISOString(),
        };
    }
}
