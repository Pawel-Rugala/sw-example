import fs from "fs/promises";
import path from "path";
import {
    peopleSchema,
    filmSchema,
    starshipSchema,
    specieSchema,
    vehicleSchema,
    planetSchema,
    rootSchema,
} from "@repo/schemas";
import { connectDb } from "./connect";
import {
    peopleCollection,
    filmCollection,
    specieCollection,
    starshipCollection,
    vehicleCollection,
    planetCollection,
    rootCollection,
} from "./collection";
import { Collection } from "mongodb";
import { ZodSchema } from "zod";

const saveData = async <T>(collection: Collection, data: T[]) => {
    try {
        // @ts-expect-error Generic function to insert many data
        await collection.insertMany(data);
    } catch (error) {
        console.error("Error saving data:", error);
        throw error;
    }
};

type DomainMapping = Record<
    string,
    {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        schema: ZodSchema<any>;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        collection: Collection<any>;
    }
>;

const domainMapping: DomainMapping = {
    people: { schema: peopleSchema, collection: peopleCollection },
    films: { schema: filmSchema, collection: filmCollection },
    species: { schema: specieSchema, collection: specieCollection },
    vehicles: { schema: vehicleSchema, collection: vehicleCollection },
    starships: { schema: starshipSchema, collection: starshipCollection },
    planets: { schema: planetSchema, collection: planetCollection },
    root: { schema: rootSchema, collection: rootCollection },
};

const parseToDomain = async (data: object[], fileName: string) => {
    const domain = fileName.split(".")[0] as keyof typeof domainMapping;
    const domainData = domainMapping[domain];

    if (!domainData) {
        throw new Error(`Invalid domain: ${domain}`);
    }

    try {
        const parsedData = data.map((item) => domainData.schema.parse(item));
        await saveData(domainData.collection, parsedData);
        console.log(`> ${domain} seeded`);
    } catch (error) {
        console.error(`Failed to seed ${domain}:`, error);
        throw error;
    }
};

const readJson = async (file: string) => {
    try {
        const data = await fs.readFile(path.join(__dirname, "seed", file), "utf-8");
        const parsedData = JSON.parse(data);
        await parseToDomain(parsedData, file);
    } catch (error) {
        console.error(`Failed to read file ${file}:`, error);
        throw error;
    }
};

const readJsons = async (files: string[]) => {
    const promises = files.map((file) => readJson(file));
    await Promise.all(promises);
};

(async () => {
    try {
        console.log("--- Seeding data");
        await connectDb();

        const files = await fs.readdir(path.join(__dirname, "seed"));
        await readJsons(files);

        console.log("--- Done seeding");
        process.exit(0);
    } catch (error) {
        console.error("--- Seeding failed:", error);
        process.exit(1);
    }
})();
