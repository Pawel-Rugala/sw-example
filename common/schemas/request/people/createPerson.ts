import { z } from "zod";
import { peopleSchema } from "../../core/people";

export const createPersonSchema = z.object({
    body: peopleSchema,
});
