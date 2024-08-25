import { z } from "zod";
import { keyNameArraySchema, keySchema } from "../utils";

export const filmSchema = z.object({
    key: keySchema,
    title: z.string(),
    episode_id: z.number(),
    opening_crawl: z.string().optional(),
    director: z.string(),
    producer: z.string().optional(),
    release_date: z.string(),
    characters: keyNameArraySchema,
    planets: keyNameArraySchema,
    starships: keyNameArraySchema,
    vehicles: keyNameArraySchema,
    species: keyNameArraySchema,
    desc: z.array(z.string()).default([]),
});

export type Film = z.infer<typeof filmSchema>;
