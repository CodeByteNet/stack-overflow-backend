import ThreadService from "@services/Thread";
import { ErrorCode, ErrorMessage, HTTPStatusCode, ResponseMessage } from "@utils/statuses";
import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "@utils/response";
import { isString } from "@utils/typeGuards";
import { HTTPError } from "@utils/errors/HTTPError";

const threadService: ThreadService = new ThreadService();

class ThreadController {
    public static async getAllThreadsByTopicId(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { topicId } = request.params;

            if(!isString(topicId)) {
                throw new HTTPError(
                    HTTPStatusCode.BAD_REQUEST,
                    ErrorMessage.BAD_CREDENTIALS,
                    ErrorCode.BAD_CREDENTIALS,
                )
            }

            const threads = await threadService.getAllThreadsByTopicId(
                topicId
            );

            sendSuccess(response, {
                statusCode: HTTPStatusCode.OK,
                meta: threads,
                ok: true,
                message: ResponseMessage.OK,
            });
        } catch (error) {
            next(error);
        }
    }

    public static async createThread(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { title, description, topicId, authorId } = request.body;

            if(!isString(title) || !isString(description) || !isString(topicId) || !isString(authorId)) {
                throw new HTTPError(
                    HTTPStatusCode.BAD_REQUEST,
                    ErrorMessage.BAD_CREDENTIALS,
                    ErrorCode.BAD_CREDENTIALS,
                )
            }

            const thread = await threadService.createThread(
                title,
                description,
                topicId,
                authorId,
            );

            sendSuccess(response, {
                statusCode: HTTPStatusCode.CREATED,
                meta: thread,
                ok: true,
                message: ResponseMessage.OK,
            });
        } catch (error) {
            next(error);
        }
    }

    public static async getThreadContentByThreadId(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { threadId } = request.params;

            if(!isString(threadId)) {
                throw new HTTPError(
                    HTTPStatusCode.BAD_REQUEST,
                    ErrorMessage.BAD_CREDENTIALS,
                    ErrorCode.BAD_CREDENTIALS,
                )
            }

            const threadContent = await threadService.getThreadContentByThreadId(threadId);

            sendSuccess(response, {
                statusCode: HTTPStatusCode.OK,
                meta: threadContent,
                ok: true,
                message: ResponseMessage.OK,
            })
        } catch(error) {
            next(error);
        }
    }
}

export default ThreadController;
