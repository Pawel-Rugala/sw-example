import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { fieldsToReturnSchema } from "./getPerson";

extendZodWithOpenApi(z);

export const getPeopleSchema = z.object({
    query: z
        .object({
            fieldsToReturn: fieldsToReturnSchema,
            page: z
                .string()
                .default("1")
                .transform((val) => parseInt(val, 10)),
            pageSize: z
                .string()
                .default("10")
                .transform((val) => parseInt(val, 10)),
        })
        .openapi({
            description: "Query parameters for getting people",
        }),
});

export type GetPeopleRequest = z.infer<typeof getPeopleSchema>;
