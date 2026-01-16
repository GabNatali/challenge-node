import {Task} from "../entities/Task";


export interface TaskRepository {
    save(task: Task): Promise<void>;
    findById(id: string): Promise<Task | null>;
    findAllByOwnerId(ownerId: string): Promise<Task[]>;
    deleteById(taskId: string): Promise<void>;
}
