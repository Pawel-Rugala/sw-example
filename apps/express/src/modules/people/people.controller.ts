import { Request, Response } from "express";
import { PeopleRepository } from "./people.repo";
import { ErrMsgs } from "../../errors/ErrMsgs";
import {
    DeletePersonRequest,
    getPeopleListResponseSchema,
    GetPeopleRequest,
    GetPersonRequest,
    PatchPersonRequest,
    peopleSchema,
} from "@repo/schemas";
import { ParsedRequest } from "../../abstract/ParsedRequest";

export class PeopleController {
    constructor(private readonly repo: PeopleRepository) {}
    getPeople = async (req: ParsedRequest<GetPeopleRequest>, res: Response) => {
        try {
            const { fieldsToReturn, page, pageSize } = req.query;
            const people = await this.repo.getPeople(page, pageSize, fieldsToReturn);
            if (!people) {
                throw new Error();
            }
            res.send(getPeopleListResponseSchema.parse(people));
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: ErrMsgs.INTERNAL_ERROR });
        }
    };
    createPerson = async (req: Request, res: Response) => {
        try {
            const person = req.body;
            const result = await this.repo.createPerson(person);
            if (!result || !result.acknowledged) {
                throw new Error();
            }
            res.status(201).send({ msg: "person created" });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: ErrMsgs.INTERNAL_ERROR });
        }
    };
    getPerson = async (req: ParsedRequest<GetPersonRequest>, res: Response) => {
        try {
            const { key } = req.params;
            const { fieldsToReturn } = req.query;
            const people = await this.repo.getPerson(key, fieldsToReturn);
            const result = peopleSchema.partial().parse(people);
            res.send(result);
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: ErrMsgs.INTERNAL_ERROR });
        }
    };
    putPerson = async (req: ParsedRequest<PatchPersonRequest>, res: Response) => {
        try {
            const { key } = req.params;
            const person = req.body;
            const result = await this.repo.updatePerson(key, person);
            res.send(peopleSchema.parse(result));
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: ErrMsgs.INTERNAL_ERROR });
        }
    };
    deletePerson = async (req: ParsedRequest<DeletePersonRequest>, res: Response) => {
        try {
            const { key } = req.params;
            const result = await this.repo.deletePerson(key);
            if (!result || !result.acknowledged) {
                throw new Error();
            }
            res.send({ msg: "DELETED" });
        } catch (err) {
            console.error(err);
            res.status(500).send({ msg: ErrMsgs.INTERNAL_ERROR });
        }
    };
}
