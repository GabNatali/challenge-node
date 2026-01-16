import {z} from "zod";

export const RegisterBodySchema = z.object({
    email: z.string().trim().email("invalid email"),
});
