import { ZodError } from "zod";
import { Response } from "express";
import { ErrMsgs } from "./ErrMsgs";
import { ApiError } from "./ApiError";

export const errorHandler = (err: unknown, res: Response) => {
    if (err instanceof ZodError) {
        return res.status(400).send({
            message: ErrMsgs.PROBLEM_WITH_REQUEST,
            errors: err.flatten(),
        });
    }
    if (err instanceof ApiError) {
        return res.status(err.statusCode).send(err);
    }
    res.status(500).json({
        message: ErrMsgs.INTERNAL_ERROR,
    });
};
