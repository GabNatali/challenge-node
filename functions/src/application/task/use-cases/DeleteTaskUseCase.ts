import {TaskForbiddenError} from "../../../domain/task/errors/TaskForbiddenError";
import {TaskNotFoundError} from "../../../domain/task/errors/TaskNotFoundError";
import {TaskRepository} from "../../../domain/task/repository/TaskRepository";

export class DeleteTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) { }

    async execute(ownerId: string, taskId: string): Promise<void> {
        const task = await this.taskRepository.findById(taskId);
        if (!task) throw new TaskNotFoundError();

        if (task.ownerId !== ownerId) throw new TaskForbiddenError();

        await this.taskRepository.deleteById(taskId);
    }
}
