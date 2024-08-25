import { z } from "zod";

export const createPersonSchema = z.object({
    msg: z.string(),
});
