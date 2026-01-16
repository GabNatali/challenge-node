import {Task} from "../../../domain/task/entities/Task";
import {TaskRepository} from "../../../domain/task/repository/TaskRepository";
import {IdGenerator} from "../../common/ports/IdGenerator";
import {CreateTaskRequestDTO, CreateTaskResponseDTO} from "../dtos/CreateTaskDTO";


export class CreateTaskUseCase {
    constructor(
        private taskRepository: TaskRepository,
        private readonly idGenerator: IdGenerator,
    ) {}

    async execute(ownerId:string, input: CreateTaskRequestDTO): Promise<CreateTaskResponseDTO> {
        const task = Task.create({
            id: this.idGenerator.generate(),
            title: input.title,
            description: input.description,
            ownerId,
        });

        await this.taskRepository.save(task);

        return {
            id: task.id,
            title: task.title,
            description: task.description || "",
            ownerId: task.ownerId,
            status: task.status,
            createdAt: task.createdAt.toISOString(),
        };
    }
}
