import {z} from "zod";

export const UpdateTaskStatusBodySchema = z.object({
    status: z.enum(["PENDING", "DONE"]),
});
