import { ModuleRouter } from "../../abstract/ModuleRouter";
import { Request, Response } from "express";
import { openapi } from "../../openapi/registry";

openapi.registerPath({
    method: "get",
    path: "/",
    description: "Healthcheck endpoint",
    responses: {
        200: {
            description: "OK",
        },
    },
});

openapi.registerPath({
    method: "get",
    path: "/openapi",
    description: "OpenAPI specification",
    responses: {
        200: {
            description: "OpenAPI JSON",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                    },
                },
            },
        },
    },
});

export class AppRouter extends ModuleRouter {
    constructor(path: string) {
        super(path);

        this.registerRoutes();
    }

    protected registerRoutes() {
        this.router.get("/", (_req: Request, res: Response) => {
            res.send("OK");
        });
        this.router.get("/openapi", (_req: Request, res: Response) => {
            res.send(openapi.getDoc());
        });
    }
}
