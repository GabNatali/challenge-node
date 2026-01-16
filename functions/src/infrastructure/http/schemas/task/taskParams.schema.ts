import {z} from "zod";

export const TaskParamsSchema = z.object({
    id: z.string().min(1, "Task ID is required"),
});
