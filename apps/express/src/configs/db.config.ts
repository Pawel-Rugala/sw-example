import { z } from "zod";

// Schemas
export const dbConfigSchema = z.object({
    URI: z.string().default("mongodb://localhost:27017/exp-app"),
});

// Config
export const dbConfig = dbConfigSchema.parse(process.env);
