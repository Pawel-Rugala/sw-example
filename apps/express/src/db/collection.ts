import { Document } from "mongodb";
import { mongo } from "./connect";
import { People, Film, Vehicle, Planet, Specie, Starship, Root } from "@repo/schemas";

const getCollection = <T extends Document>(name: string) => {
    return mongo.db("dev").collection<T>(name);
};

export const peopleCollection = getCollection<People>("people");
export const filmCollection = getCollection<Film>("films");
export const vehicleCollection = getCollection<Vehicle>("vehicles");
export const planetCollection = getCollection<Planet>("planets");
export const specieCollection = getCollection<Specie>("species");
export const starshipCollection = getCollection<Starship>("starships");
export const rootCollection = getCollection<Root>("root");
