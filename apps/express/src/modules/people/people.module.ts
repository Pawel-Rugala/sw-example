import { PeopleRepository } from "./people.repo";
import { mongo } from "../../db/connect";
import { PeopleController } from "./people.controller";
import { PeopleRouter } from "./people.router";

const peopleRepository = new PeopleRepository(mongo);
const peopleController = new PeopleController(peopleRepository);

export const peopleModule = new PeopleRouter("people", peopleController);
