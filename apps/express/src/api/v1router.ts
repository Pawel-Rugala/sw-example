import { Express } from "express";
import { ModuleRouter } from "../abstract/ModuleRouter";
import { peopleModule } from "../modules/people/people.module";
import { appModule } from "../modules/app/app.module";

const routers: ModuleRouter[] = [appModule, peopleModule];

export const registerV1Routes = (app: Express): void => {
    routers.forEach((router) => {
        router.attach(app, "v1");
    });
};
