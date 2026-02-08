import { Response } from "express";

interface ISuccessPayload {
    statusCode: number,
    meta: unknown,
    ok: boolean,
    message: string,
};

export const sendSuccess = (
    response: Response,
    { statusCode, meta, ok, message}: ISuccessPayload,
): void => {
    response.status(statusCode).json({
        meta: meta,
        ok: ok,
        message: message,
    })
}