import { Express, Router } from "express";

export abstract class ModuleRouter {
    protected readonly router: Router = Router();

    public readonly modulePath: string;

    protected constructor(path: string) {
        this.modulePath = path;
    }

    protected abstract registerRoutes(): void;

    public attach(app: Express, apiVersion: string) {
        app.use(`/${apiVersion}/${this.modulePath}`, this.router);
    }
}
