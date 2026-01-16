export class NoTaskFieldsToUpdateError extends Error {
    constructor(message = "No fields to update") {
        super(message);
        this.name = "NoTaskFieldsToUpdateError";
    }
}
