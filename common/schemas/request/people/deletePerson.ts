import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { peopleSchema } from "../../core/people";

extendZodWithOpenApi(z);

export const deletePersonSchema = z.object({
    params: z
        .object({
            key: peopleSchema.shape.key,
        })
        .openapi({
            description: "The key of the person",
        }),
});

export type DeletePersonRequest = z.infer<typeof deletePersonSchema>;
