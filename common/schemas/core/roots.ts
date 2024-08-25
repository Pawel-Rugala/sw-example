import { z } from "zod";

export const rootSchema = z.object({
    name: z.string(),
    length: z.number(),
});

export type Root = z.infer<typeof rootSchema>;
