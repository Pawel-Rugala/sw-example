/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect, use as chaiUse } from "chai";
import sinon from "sinon";
import { Request, Response } from "express";
import { z } from "zod";
import { validateRequest } from "../../src/middlewares/requestValidator"; // Replace with the actual file name
import sinonChai from "sinon-chai";

chaiUse(sinonChai);

describe("validateRequest", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: sinon.SinonSpy;

    beforeEach(() => {
        req = {
            params: {},
            query: {},
            body: {},
        };
        res = {
            status: sinon.stub().returnsThis(),
            send: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis(),
        };
        next = sinon.spy();
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should call next() when validation passes", () => {
        const schema = z.object({
            params: z.object({ id: z.string() }),
            query: z.object({ page: z.string() }),
            body: z.object({ name: z.string() }),
        });

        req.params = { id: "123" };
        req.query = { page: "1" };
        req.body = { name: "John" };

        validateRequest(schema)(req as Request, res as Response, next);

        expect(next.calledOnce).to.be.true;
    });

    it("should not call next() and should call res.status().send() when validation fails", () => {
        const schema = z.object({
            params: z.object({ id: z.number() }),
            query: z.object({ page: z.number() }),
            body: z.object({ name: z.number() }),
        });

        req.params = { id: "invalid" };
        req.query = { page: "invalid" };
        req.body = { name: "invalid" };

        validateRequest(schema)(req as Request, res as Response, next);

        expect(next.called).to.be.false;
        expect(res.status).to.have.been.calledWith(400);
        expect(res.send).to.have.been.called;
    });

    it("should update req object with parsed data", () => {
        const schema = z.object({
            params: z.object({ id: z.string() }),
            query: z.object({ page: z.string().transform(Number) }),
            body: z.object({ name: z.string() }),
        });

        req.params = { id: "123" };
        req.query = { page: "1" };
        req.body = { name: "John" };

        validateRequest(schema)(req as Request, res as Response, next);

        expect(req.params).to.deep.equal({ id: "123" });
        expect(req.query).to.deep.equal({ page: 1 });
        expect(req.body).to.deep.equal({ name: "John" });
    });

    it("should handle missing schema parts", () => {
        const schema = z.object({
            params: z.object({ id: z.string() }),
        });

        req.params = { id: "123" };

        validateRequest(schema)(req as Request, res as Response, next);

        expect(next).to.be.calledOnce;
        expect(req.params).to.deep.equal({ id: "123" });
        expect(req.query).to.deep.equal({});
        expect(req.body).to.deep.equal({});
    });
});
