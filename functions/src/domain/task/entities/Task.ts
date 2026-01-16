import {NoTaskFieldsToUpdateError} from "../errors/NoTaskFieldsToUpdateError";
import {TaskInvalidDescriptionError} from "../errors/TaskInvalidDescriptionError";
import {TaskInvalidOwnerIdError} from "../errors/TaskInvalidOwnerIdError";
import {TaskInvalidTitleError} from "../errors/TaskInvalidTitleError ";
import {TaskStatus} from "../value-objects/TaskStatus";

type TaskProps = {
    id: string;
    ownerId : string;
    title: string;
    description?: string;
    status : TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}

export class Task {
    private constructor(private readonly props: TaskProps) {}

    private static normalizeOwnerId(raw: string): string {
        const v = (raw ?? "").trim();
        if (v.length === 0) throw new TaskInvalidOwnerIdError();
        return v;
    }
    private static normalizeTitle(raw: string): string {
        const t = (raw ?? "").trim();
        if (t.length === 0) throw new TaskInvalidTitleError();
        if (t.length > 120) throw new TaskInvalidTitleError();
        return t;
    }

    private static normalizeDescription(raw?: string): string | undefined {
        if (raw === undefined) return undefined;

        const desc = raw.trim();
        if (desc.length === 0) return undefined;
        if (desc.length > 256) throw new TaskInvalidDescriptionError();

        return desc;
    }
    static create(input: { id: string; title: string; description: string; ownerId : string}): Task {
        const now = new Date();

        return new Task({
            id: input.id,
            ownerId: Task.normalizeOwnerId(input.ownerId),
            title: Task.normalizeTitle(input.title),
            description: Task.normalizeDescription(input.description),
            status: TaskStatus.PENDING,
            createdAt: now,
            updatedAt: now,
        });
    }

    static rehydrate(input: TaskProps): Task {
        return new Task({
            id: input.id,
            ownerId: input.ownerId,
            title: Task.normalizeTitle(input.title),
            description: Task.normalizeDescription(input.description),
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });
    }
    changeStatus(newStatus: TaskStatus) {
        this.props.status = newStatus;
        this.props.updatedAt = new Date();
    }

    updateTask(input: { title?: string; description?: string }) {
        const hasTitle = input.title !== undefined;
        const hasDescription = input.description !== undefined;

        if (!hasTitle && !hasDescription) throw new NoTaskFieldsToUpdateError();

        if (hasTitle) this.props.title = Task.normalizeTitle(input.title!);
        if (hasDescription) this.props.description = Task.normalizeDescription(input.description);
        this.props.updatedAt = new Date();
    }


    get id() {
        return this.props.id;
    }
    get ownerId() {
        return this.props.ownerId;
    }
    get title() {
        return this.props.title;
    }
    get description() {
        return this.props.description;
    }
    get status() {
        return this.props.status;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
}
