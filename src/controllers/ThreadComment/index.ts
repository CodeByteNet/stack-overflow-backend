import ThreadCommentService from "@services/ThreadComment";
import { Request, Response, NextFunction } from "express";
import { HTTPError } from "@utils/errors/HTTPError";
import { sendSuccess } from "@utils/response";
import { isString } from "@utils/typeGuards";
import {
    ErrorCode,
    ErrorMessage,
    HTTPStatusCode,
    ResponseMessage,
} from "@utils/statuses";

const threadCommentService: ThreadCommentService = new ThreadCommentService();

class ThreadCommentController {
    public static async createThreadComment(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { threadCommentText, authorId, threadId } = request.body;

            if (
                !isString(threadCommentText) ||
                !isString(authorId) ||
                !isString(threadId)
            ) {
                throw new HTTPError(
                    HTTPStatusCode.BAD_REQUEST,
                    ErrorMessage.BAD_CREDENTIALS,
                    ErrorCode.BAD_CREDENTIALS,
                );
            }

            const threadComment =
                await threadCommentService.createThreadComment(
                    threadCommentText,
                    authorId,
                    threadId,
                );

            sendSuccess(response, {
                statusCode: HTTPStatusCode.CREATED,
                meta: threadComment,
                ok: true,
                message: ResponseMessage.OK,
            });
        } catch (error) {
            next(error);
        }
    }
}

export default ThreadCommentController;
