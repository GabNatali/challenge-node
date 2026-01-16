export class TaskInvalidDescriptionError extends Error {
    constructor(message = "Invalid Task Description") {
        super(message);
        this.name = "TaskInvalidDescriptionError";
    }
}
