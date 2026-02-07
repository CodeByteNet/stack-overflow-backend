import ThreadService from "@services/Thread";
import { HTTPStatusCode, ResponseMessage } from "@utils/statuses";
import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "@utils/response";

const threadService: ThreadService = new ThreadService();

class ThreadController {
    public static async getAllThreadsByTopicId(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { topicId } = request.params;

            const threads = await threadService.getAllThreadsByTopicId(
                topicId as string,
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
            const { title, description, topic_id, author_id } = request.body;

            const thread = await threadService.createThread(
                title,
                description,
                topic_id,
                author_id,
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

            const threadContent = threadService.getThreadContentByThreadId(threadId as string);

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
