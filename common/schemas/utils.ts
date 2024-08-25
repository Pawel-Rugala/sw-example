import { z } from "zod";

const transformMe = (val: string | undefined, transformFn: (val: string) => number) =>
    val === "unknown" ? undefined : val ? transformFn(val) : undefined;

export const keySchema = z.union([z.string(), z.number()]).transform((val) => {
    if (typeof val === "number") return val;
    return parseInt(val);
});

z.string().transform((val) => parseInt(val));
export const keyNameArraySchema = z.array(z.object({ key: keySchema, name: z.string() })).default([]);

export const stringToIntSchema = z.union([z.string(), z.number()]).transform((val) => {
    if (typeof val === "string") {
        transformMe(val, parseInt);
    }
    return val;
});
export const stringToFloatSchema = z.string().transform((val) => transformMe(val, parseFloat));
