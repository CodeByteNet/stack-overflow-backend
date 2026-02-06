import TopicService from "@services/Topic";
import { HTTPStatusCode, ResponseMessage } from "@utils/statuses";
import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "@utils/response";

const topicService: TopicService = new TopicService();

class TopicController {
    public static async getAllTopics(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const topics = await topicService.getAllTopics();

            sendSuccess(response, {
                statusCode: HTTPStatusCode.OK,
                meta: topics,
                ok: true,
                message: ResponseMessage.OK,
            })
        } catch(error) {
            next(error);
        }
    }

    public static async createTopic(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const secretHeader = process.env.CREATE_TOPIC_HEADER;

            if(!secretHeader) {
                throw new Error("Variable CREATE_TOPIC_HEADER not loaded from .env file");
            }

            const requestHeadersKeys = Object.keys(request.headers);

            if(!requestHeadersKeys.includes(secretHeader)) {
                throw new Error("Error");
            }

            const topicName: string = request.headers[secretHeader] as string;

            const topic = await topicService.createTopic(topicName);

            sendSuccess(response, {
                statusCode: HTTPStatusCode.CREATED,
                meta: topic,
                ok: true,
                message: ResponseMessage.OK,
            })
        } catch(error) {
            next(error);
        }
    }
}

export default TopicController;