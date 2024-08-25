import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { peopleSchema } from "../../core/people";

extendZodWithOpenApi(z);

export const patchPersonSchema = z.object({
    params: z
        .object({
            key: peopleSchema.shape.key,
        })
        .openapi({
            description: "The key of the person",
        }),
    body: peopleSchema.partial(),
});

export type PatchPersonRequest = z.infer<typeof patchPersonSchema>;
