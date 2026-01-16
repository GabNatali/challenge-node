import {TaskRepository} from "../../../domain/task/repository/TaskRepository";
import {ListTasksResponseDTO} from "../dtos/ListTasksDTO";


export class ListTasksUseCase {
    constructor(
        private readonly taskRepository: TaskRepository
    ) { }

    async execute(ownerId: string): Promise<ListTasksResponseDTO> {
        const tasks = await this.taskRepository.findAllByOwnerId(ownerId);
        return tasks.map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description || undefined,
            status: task.status,
            createdAt: task.createdAt.toISOString(),
        }));
    }
}
