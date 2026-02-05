import { ErrorCode } from "../../../utils/statuses";

export class HTTPError extends Error {
    public readonly statusCode: number;

    public readonly code: ErrorCode;

    constructor(statusCode: number, message: string, code: ErrorCode = ErrorCode.INTERNAL) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.name = 'HTTPError';
    }
}