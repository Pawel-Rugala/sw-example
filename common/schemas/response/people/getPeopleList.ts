import { z } from "zod";
import { peopleSchema } from "../../core/people";

export const getPeopleListResponseSchema = z.object({
    metadata: z.object({
        totalCount: z.number(),
        page: z.number(),
        pageSize: z.number(),
    }),
    data: z.array(peopleSchema.partial()).default([]),
});
