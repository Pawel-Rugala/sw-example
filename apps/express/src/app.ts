import express, { Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, _res: Response, next: NextFunction) => {
    console.log(`Request: ${req.method} ${req.path}`);
    next();
});

export { app };
