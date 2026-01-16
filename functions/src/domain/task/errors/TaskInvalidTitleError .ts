

export class TaskInvalidTitleError extends Error {
    constructor(message = "Invalid Task Title") {
        super(message);
        this.name = "TaskInvalidTitleError";
    }
}
