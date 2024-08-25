import { z } from "zod";
import { keyNameArraySchema, keySchema, stringToIntSchema } from "../utils";

export const specieSchema = z.object({
    key: keySchema,
    name: z.string(),
    designation: z.string().optional(),
    skin_colors: z.string().optional(),
    hair_colors: z.string().optional(),
    eye_colors: z.string().optional(),
    average_lifespan: stringToIntSchema,
    homeworld: z
        .object({
            key: keySchema,
            name: z.string(),
        })
        .optional(),
    language: z.string().optional(),
    people: keyNameArraySchema,
    films: z.array(z.object({ key: keySchema, title: z.string() })).default([]),
    desc: z.array(z.string()).default([]),
});

export type Specie = z.infer<typeof specieSchema>;
