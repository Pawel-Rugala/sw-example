import { z } from "zod";
import { keyNameArraySchema, keySchema, stringToIntSchema } from "../utils";

export const planetSchema = z.object({
    key: keySchema,
    name: z.string(),
    rotation_period: stringToIntSchema,
    orbital_period: stringToIntSchema,
    diameter: stringToIntSchema,
    climate: z.string().optional(),
    gravity: z.string().optional(),
    terrain: z.string().optional(),
    surface_water: stringToIntSchema,
    residents: keyNameArraySchema,
    population: stringToIntSchema,
    films: z.array(z.object({ key: keySchema, title: z.string() })).default([]),
    desc: z.array(z.string()).default([]),
});

export type Planet = z.infer<typeof planetSchema>;
