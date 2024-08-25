import { z } from "zod";

// Schemas
export const appConfigSchema = z.object({
    PORT: z
        .string()
        .default("3000")
        .transform((val) => parseInt(val)),
});

// Config
export const appConfig = appConfigSchema.parse(process.env);
