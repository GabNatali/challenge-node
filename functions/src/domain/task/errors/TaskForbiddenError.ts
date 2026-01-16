export class TaskForbiddenError extends Error {
    constructor(message = "Forbidden") {
        super(message);
        this.name = "TaskForbiddenError";
    }
}
