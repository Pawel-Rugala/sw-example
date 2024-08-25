import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { peopleSchema } from "../../core/people";

extendZodWithOpenApi(z);

export const fieldsToReturnSchema = z
    .string()
    .transform((val) => val.split(",").map((field) => field.trim()))
    .refine((fields) => fields.every((field) => Object.keys(peopleSchema.shape).includes(field)), {
        message: "Invalid fields in fieldsToReturn",
    })
    .optional();

export const getPersonSchema = z.object({
    params: z
        .object({
            key: peopleSchema.shape.key,
        })
        .openapi({
            description: "The key of the person",
        }),
    query: z.object({
        fieldsToReturn: fieldsToReturnSchema,
    }),
});

export type PeopleFieldsToReturn = z.infer<typeof fieldsToReturnSchema>;
export type GetPersonRequest = z.infer<typeof getPersonSchema>;
