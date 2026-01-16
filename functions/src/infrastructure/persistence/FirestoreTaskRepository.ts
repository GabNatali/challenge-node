import admin from "firebase-admin";
import {TaskRepository} from "../../domain/task/repository/TaskRepository";
import {Task} from "../../domain/task/entities/Task";
import {firestore} from "../config/firebase";
import {TaskStatus} from "../../domain/task/value-objects/TaskStatus";


type TaskStatusDoc = "PENDING" | "DONE";

type TaskDoc = {
    ownerId : string;
    title : string;
    description : string | null;
    status : TaskStatusDoc;
    createdAt : admin.firestore.Timestamp;
    updatedAt : admin.firestore.Timestamp;
}

export class FirestoreTaskRepository implements TaskRepository {
    private readonly col = firestore.collection("tasks");
    private toDocStatus(s: TaskStatus): TaskStatusDoc {
        return s === TaskStatus.DONE ? "DONE" : "PENDING";
    }
    private toDomainStatus(s: TaskStatusDoc): TaskStatus {
        return s === "DONE" ? TaskStatus.DONE : TaskStatus.PENDING;
    }

    async save(task: Task): Promise<void> {
        const doc: TaskDoc = {
            ownerId: task.ownerId,
            title: task.title,
            description: task.description ?? null,
            status: this.toDocStatus(task.status),
            createdAt: admin.firestore.Timestamp.fromDate(task.createdAt),
            updatedAt: admin.firestore.Timestamp.fromDate(task.updatedAt),
        };

        await this.col.doc(task.id).set(doc, {merge: true});
    }
    async findById(id: string): Promise<Task | null> {
        const snap = await this.col.doc(id).get();

        if (!snap.exists) return null;

        const data = snap.data() as TaskDoc;

        return Task.rehydrate({
            id: snap.id,
            ownerId: data.ownerId,
            title: data.title,
            description: data.description ?? undefined,
            status: this.toDomainStatus(data.status),
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
        });
    }
    findAllByOwnerId(ownerId: string): Promise<Task[]> {
        const q = this.col.where("ownerId", "==", ownerId).orderBy("createdAt", "desc").get();

        return q.then((querySnapshot) => {
            const tasks: Task[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data() as TaskDoc;
                tasks.push(Task.rehydrate({
                    id: doc.id,
                    ownerId: data.ownerId,
                    title: data.title,
                    description: data.description ?? undefined,
                    status: this.toDomainStatus(data.status),
                    createdAt: data.createdAt.toDate(),
                    updatedAt: data.updatedAt.toDate(),
                }));
            });
            return tasks;
        });
    }
    async deleteById(taskId: string): Promise<void> {
        await this.col.doc(taskId).delete();
    }
}
