import request from "supertest";
import { app } from "../../../src/app";
import { describe } from "mocha";
import { expect } from "chai";
import { mongoClient } from "../setup";
import { PeopleRepository } from "../../../src/modules/people/people.repo";
import { PeopleController } from "../../../src/modules/people/people.controller";
import { PeopleRouter } from "../../../src/modules/people/people.router";
import { mockPerson } from "./people.mock";
import { ErrMsgs } from "../../../src/errors/ErrMsgs";

describe("CREATE /v1/people", async () => {
    before(async () => {
        const peopleRepo = new PeopleRepository(mongoClient);
        const peopleController = new PeopleController(peopleRepo);
        const peopleRouter = new PeopleRouter("people", peopleController);

        peopleRouter.attach(app, "v1");
    });

    it("should create new person", async () => {
        const res = await request(app).post("/v1/people").send(mockPerson);
        expect(res.status).to.eq(201);
        expect(res.body.msg).to.eq("person created");
    });
    it("should not create new person", async () => {
        const res = await request(app).post("/v1/people").send({});

        expect(res.status).to.eq(400);
        expect(res.body).to.have.property("message").and.to.be.a("string").and.eq(ErrMsgs.PROBLEM_WITH_REQUEST);
        expect(res.body).to.have.property("errors").and.to.be.an("array");
    });
});
