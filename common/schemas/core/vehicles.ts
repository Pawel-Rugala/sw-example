import { z } from "zod";
import { keyNameArraySchema, keySchema, stringToFloatSchema, stringToIntSchema } from "../utils";

export const vehicleSchema = z.object({
    key: keySchema,
    name: z.string(),
    model: z.string(),
    manufacturer: z.string().optional(),
    cost_in_credits: stringToIntSchema,
    length: stringToFloatSchema,
    max_atmosphering_speed: stringToIntSchema,
    crew: stringToIntSchema,
    passengers: stringToIntSchema,
    cargo_capacity: stringToIntSchema,
    consumables: z.string().optional(),
    vehicle_class: z.string(),
    pilots: keyNameArraySchema,
    films: z.array(z.object({ key: keySchema, title: z.string() })).default([]),
});

export type Vehicle = z.infer<typeof vehicleSchema>;
