import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";
import { afterEach, before } from "mocha";

let mongoDB: MongoMemoryServer;
let uri: string;
export let mongoClient: MongoClient;
before(async () => {
    mongoDB = await MongoMemoryServer.create({
        instance: {
            dbName: "dev",
        },
    });
    uri = mongoDB.getUri();
    mongoClient = new MongoClient(uri);
});

beforeEach(async () => {
    await mongoClient.connect();
    await mongoClient.db("dev").dropDatabase();
});

afterEach(async () => {
    await mongoClient.close();
});

after(async () => {
    await mongoDB.stop();
});
