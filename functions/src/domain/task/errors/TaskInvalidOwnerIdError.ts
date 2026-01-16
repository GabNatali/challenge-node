export class TaskInvalidOwnerIdError extends Error {
    constructor(message = "OwnerId is required") {
        super(message);
        this.name = "TaskInvalidOwnerIdError";
    }
}
