import { Request, Response, NextFunction } from "express";
import { AnyZodObject, z, ZodError } from "zod";
import { ErrMsgs } from "../errors/ErrMsgs";
import { ApiError } from "../errors/ApiError";
import { errorHandler } from "../errors/errorHandler";

const formatErrors = (errors: ZodError[]) => {
    return errors
        .map((error: ZodError | undefined) => {
            if (error) {
                return error.flatten();
            }
        })
        .filter((error) => Boolean(error));
};

const parseRequest = (schema: AnyZodObject, req: Request) => {
    const { params, query, body } = req;

    const parsedParams = schema.shape.params ? schema.shape.params.safeParse(params) : { data: {} };
    const parsedQuery = schema.shape.query ? schema.shape.query.safeParse(query) : { data: {} };
    const parsedBody = schema.shape.body ? schema.shape.body.safeParse(body) : { data: {} };

    if (parsedParams.error || parsedQuery.error || parsedBody.error) {
        throw new ApiError(
            400,
            ErrMsgs.PROBLEM_WITH_REQUEST,
            formatErrors([parsedParams.error, parsedQuery.error, parsedBody.error])
        );
    }

    return {
        params: parsedParams.data,
        query: parsedQuery.data,
        body: parsedBody.data,
    };
};

export const validateRequest = (schema: AnyZodObject) => {
    return (req: Request<z.infer<typeof schema>>, res: Response, next: NextFunction): void => {
        try {
            const result = parseRequest(schema, req);

            const { params, query, body } = result;
            req.query = query;
            req.params = params;
            req.body = body;

            next();
        } catch (errors) {
            errorHandler(errors, res);
        }
    };
};
