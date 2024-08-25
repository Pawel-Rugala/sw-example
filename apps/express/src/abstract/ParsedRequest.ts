import { Request } from "express";
import { ParsedQs } from "qs";

export type ExpressRequest<
    T extends {
        query?: {
            [key: string]: unknown;
        };
        body?: {
            [key: string]: unknown;
        };
        params?: {
            [key: string]: unknown;
        };
    },
> = Request<T["params"], object, T["body"], T["query"] & ParsedQs>;

export type ParsedRequest<
    T extends {
        query?: {
            [key: string]: unknown;
        };
        body?: {
            [key: string]: unknown;
        };
        params?: {
            [key: string]: unknown;
        };
    },
> = ExpressRequest<T>;
