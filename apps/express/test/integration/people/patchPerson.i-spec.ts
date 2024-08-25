import request from "supertest";
import { app } from "../../../src/app";
import { describe } from "mocha";
import { expect } from "chai";
import { PeopleRepository } from "../../../src/modules/people/people.repo";
import { PeopleController } from "../../../src/modules/people/people.controller";
import { PeopleRouter } from "../../../src/modules/people/people.router";
import { mockPerson } from "./people.mock";
import { mongoClient } from "../setup";

describe("PATCH /v1/people/:key", async () => {
    before(async () => {
        const peopleRepo = new PeopleRepository(mongoClient);
        const peopleController = new PeopleController(peopleRepo);
        const peopleRouter = new PeopleRouter("people", peopleController);

        peopleRouter.attach(app, "v1");
    });
    it("should patch person", async () => {
        await mongoClient.db("dev").collection("people").insertOne(mockPerson);
        const res = await request(app).patch(`/v1/people/${mockPerson.key}`).send({ name: "new name" });

        expect(res.status).to.eq(200);
        expect(res.body).to.haveOwnProperty("name").eq("new name");
    });
});
