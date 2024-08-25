import { MongoClient } from "mongodb";
import { dbConfig } from "../configs/db.config";

const mongo: MongoClient = new MongoClient(dbConfig.URI);

const connectDb = async () => {
    try {
        await mongo.connect();
    } catch (err) {
        console.error(err);
    }
};

const disconnectDb = async () => {
    try {
        await mongo.close();
    } catch (err) {
        console.error(err);
    }
};

export { connectDb, disconnectDb, mongo };
