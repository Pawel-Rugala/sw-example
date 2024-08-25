export class ApiError {
    statusCode: number;
    message: string;
    errors?: unknown;
    constructor(statusCode: number, message: string, errors?: unknown) {
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
    }
}
