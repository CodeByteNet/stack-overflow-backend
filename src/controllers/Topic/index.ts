import bcrypt from 'bcrypt';
import TopicService from "@services/Topic";
import { HTTPStatusCode, ResponseMessage } from "@utils/statuses";
import { NextFunction, Request, Response } from "express";
import { createTopicConfig } from "@utils/configs";
import { sendSuccess } from "@utils/response";

const topicService: TopicService = new TopicService();

const isHeaderAllowed = async (request: Request): Promise<void> => {
    if(!(await bcrypt.compare(request.get(createTopicConfig.header) as string, createTopicConfig.value))) {
        throw new Error();
    };
}

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
            isHeaderAllowed(request);

            const { name } = request.body;

            const topic = await topicService.createTopic(name);

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