import {z} from "zod";

export const LoginBodySchema = z.object({
    email: z.string().trim().email("invalid email"),
});
