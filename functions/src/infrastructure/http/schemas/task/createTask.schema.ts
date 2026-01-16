import {z} from "zod";

const normalizeSpaces = (val: string) => val.replace(/\s+/g, " ").trim();

export const CreateTaskBodySchema = z
    .object({
        title: z
            .string()
            .transform(normalizeSpaces)
            .pipe(z
                .string()
                .min(1, "title required")
                .max(120, "the title cannot have more than 120 characters")
            ),
        description: z
            .string()
            .optional()
            .transform((val) => {
                if (val === undefined) return undefined;
                const normalized = normalizeSpaces(val);
                return normalized.length === 0 ? undefined : normalized;
            }).pipe(z.union([
                z.undefined(),
                z.string().max(256, "The description cannot have more than 256 characters"),
            ])
            ),
    });

