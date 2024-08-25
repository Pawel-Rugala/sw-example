import { z } from "zod";
import { keyNameArraySchema, keySchema, stringToIntSchema } from "../utils";

const GenderEnum = {
    MALE: "male",
    NA: "n/a",
    FEMALE: "female",
    NONE: "none",
    HERMAPHRODITE: "hermaphrodite",
    UNKNOWN: "unknown",
    DROkey: "drokey",
} as const;

export const peopleSchema = z.object({
    key: keySchema,
    name: z.string(),
    height: stringToIntSchema.optional(),
    mass: stringToIntSchema.optional(),
    hair_color: z.string().optional(),
    skin_color: z.string().optional(),
    eye_color: z.string().optional(),
    birth_year: z.string().optional(),
    gender: z.nativeEnum(GenderEnum),
    homeworld: z
        .object({
            key: keySchema,
            name: z.string(),
        })
        .optional(),
    films: z
        .array(
            z.object({
                key: keySchema,
                title: z.string(),
            })
        )
        .default([]),
    species: keyNameArraySchema,
    vehicles: keyNameArraySchema,
    starships: keyNameArraySchema,
    desc: z.array(z.string()).default([]),
});

export type People = z.infer<typeof peopleSchema>;
