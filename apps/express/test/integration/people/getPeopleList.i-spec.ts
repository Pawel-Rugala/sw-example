import request from "supertest";
import { app } from "../../../src/app";
import { describe } from "mocha";
import { expect } from "chai";
import { PeopleRepository } from "../../../src/modules/people/people.repo";
import { PeopleController } from "../../../src/modules/people/people.controller";
import { PeopleRouter } from "../../../src/modules/people/people.router";
import { mockPerson } from "./people.mock";
import { mongoClient } from "../setup";
import { ObjectId } from "mongodb";

const generatePeopleList = (count: number) => {
    const people = [];
    for (let i = 0; i < count; i++) {
        people.push({ ...mockPerson, _id: new ObjectId(), key: i + 1 });
    }
    return people;
};

describe("GET /v1/people", async () => {
    before(async () => {
        const peopleRepo = new PeopleRepository(mongoClient);
        const peopleController = new PeopleController(peopleRepo);
        const peopleRouter = new PeopleRouter("people", peopleController);

        peopleRouter.attach(app, "v1");
    });

    it("should get list of people", async () => {
        await mongoClient.db("dev").collection("people").insertMany(generatePeopleList(100));

        const fieldsToReturn = ["name"];
        const res = await request(app).get(`/v1/people`).query({ fieldsToReturn, page: 1, pageSize: 10 });

        expect(res.status).to.eq(200);
        const { metadata, data } = res.body;
        expect(metadata.totalCount).to.eq(100);
        expect(metadata.page).to.eq(1);
        expect(metadata.pageSize).to.eq(10);
        expect(data).to.have.lengthOf(10);
        expect(data[0]).to.have.keys("name");
    });
});
