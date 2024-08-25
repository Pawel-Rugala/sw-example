import { ErrMsgs } from "../errors/ErrMsgs";

export const API_RESPONSES = {
    CREATED: {
        description: "Created",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        msg: {
                            type: "string",
                        },
                    },
                },
            },
        },
    },
    INTERNAL_ERROR: {
        description: "Internal error",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        msg: {
                            type: "string",
                            example: ErrMsgs.INTERNAL_ERROR,
                        },
                    },
                },
            },
        },
    },
    BAD_REQUEST: {
        description: "Bad request",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        msg: {
                            type: "string",
                            example: ErrMsgs.PROBLEM_WITH_REQUEST,
                        },
                    },
                },
            },
        },
    },
} as const;
