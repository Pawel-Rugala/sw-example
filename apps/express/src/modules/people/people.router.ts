import { ModuleRouter } from "../../abstract/ModuleRouter";
import { PeopleController } from "./people.controller";
import { validateRequest } from "../../middlewares/requestValidator";
import {
    createPersonSchema,
    deletePersonSchema,
    getPeopleListResponseSchema,
    getPeopleSchema,
    getPersonSchema,
    patchPersonSchema,
    peopleSchema,
} from "@repo/schemas";
import { openapi } from "../../openapi/registry";
import { API_RESPONSES } from "../../openapi/responses";

export class PeopleRouter extends ModuleRouter {
    constructor(
        path: string,
        private readonly controller: PeopleController
    ) {
        super(path);

        this.registerRoutes();
    }

    protected registerRoutes() {
        this.router.get("/", validateRequest(getPeopleSchema), this.controller.getPeople);
        this.router.post("/", validateRequest(createPersonSchema), this.controller.createPerson);
        this.router.get("/:key", validateRequest(getPersonSchema), this.controller.getPerson);
        this.router.patch("/:key", validateRequest(patchPersonSchema), this.controller.putPerson);
        this.router.delete("/:key", validateRequest(deletePersonSchema), this.controller.deletePerson);
    }
}

//#region OPENAPI Specification
openapi.registerPath({
    path: "/v1/people",
    method: "get",
    description: "Get list of people",
    request: {
        query: getPeopleSchema.shape.query,
    },
    responses: {
        200: {
            description: "Created",
            content: {
                "application/json": {
                    schema: getPeopleListResponseSchema,
                },
            },
        },
        400: API_RESPONSES.BAD_REQUEST,
        500: API_RESPONSES.INTERNAL_ERROR,
    },
});
openapi.registerPath({
    path: "/v1/people",
    method: "post",
    description: "Create a person",
    request: {
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: createPersonSchema.shape.body,
                },
            },
        },
    },
    responses: {
        201: API_RESPONSES.CREATED,
        400: API_RESPONSES.BAD_REQUEST,
        500: API_RESPONSES.INTERNAL_ERROR,
    },
});

openapi.registerPath({
    path: "/v1/people/{key}",
    method: "get",
    description: "Get person",
    request: {
        params: getPersonSchema.shape.params,
    },
    responses: {
        200: {
            description: "Created",
            content: {
                "application/json": {
                    schema: peopleSchema.partial(),
                },
            },
        },
        400: API_RESPONSES.BAD_REQUEST,
        500: API_RESPONSES.INTERNAL_ERROR,
    },
});

openapi.registerPath({
    path: "/v1/people/{key}",
    method: "patch",
    description: "Update person",
    request: {
        params: patchPersonSchema.shape.params,
        body: {
            required: true,
            content: {
                "application/json": {
                    schema: patchPersonSchema.shape.body,
                },
            },
        },
    },
    responses: {
        200: {
            description: "Created",
            content: {
                "application/json": {
                    schema: peopleSchema.partial(),
                },
            },
        },
        400: API_RESPONSES.BAD_REQUEST,
        500: API_RESPONSES.INTERNAL_ERROR,
    },
});
//#endregion
