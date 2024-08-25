import { OpenApiGeneratorV3, OpenAPIRegistry, RouteConfig } from "@asteasolutions/zod-to-openapi";

export class OpenAPI {
    private readonly registry: OpenAPIRegistry;
    constructor() {
        this.registry = new OpenAPIRegistry();
    }

    public registerPath(routeConfig: RouteConfig) {
        this.registry.registerPath(routeConfig);
    }

    public getDoc() {
        const generator = new OpenApiGeneratorV3(this.registry.definitions);
        return generator.generateDocument({
            openapi: "3.0.0",
            info: {
                title: "Star Wars API",
                version: "1.0.0",
                description: "This is a simple API for Star Wars movies",
            },
            servers: [
                {
                    url: "http://localhost:3000",
                },
            ],
        });
    }
}

export const openapi = new OpenAPI();
