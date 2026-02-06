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
}

export default TopicController;