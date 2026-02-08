import ThreadStatisticService from "@services/ThreadStatistics";
import { Request, Response, NextFunction } from "express";
import { HTTPError } from "@utils/errors/HTTPError";
import { sendSuccess } from "@utils/response";
import {
    ErrorCode,
    ErrorMessage,
    HTTPStatusCode,
    ResponseMessage,
} from "@utils/statuses";

const threadStatisticService = new ThreadStatisticService();

class ThreadStatisticController {
    public static async getThreadStatisticByThreadId(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { threadId } = request.params;

            const threadStatistic =
                await threadStatisticService.getThreadStatisticByThreadId(
                    threadId as string,
                );

            sendSuccess(response, {
                statusCode: HTTPStatusCode.OK,
                meta: threadStatistic,
                ok: true,
                message: ResponseMessage.OK,
            });
        } catch (error) {
            next(error);
        }
    }

    public static async updateThreadStatisticByThreadId(
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        try {
            const { threadId, userId } = request.params;

            if (!threadId || !userId) {
                throw new HTTPError(
                    HTTPStatusCode.NOT_FOUND,
                    ErrorMessage.URL_NOT_FOUND,
                    ErrorCode.URL_NOT_FOUND,
                );
            }

            const updatedStatistic =
                await threadStatisticService.updateTreadStatisticsByThreadId(
                    threadId as string,
                );

            sendSuccess(response, {
                statusCode: HTTPStatusCode.OK,
                meta: updatedStatistic,
                ok: true,
                message: ResponseMessage.OK,
            })
        } catch (error) {
            next(error);
        }
    }
}

export default ThreadStatisticController;
