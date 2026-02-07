import CommentService from "@services/Comment";
import { HTTPStatusCode, ResponseMessage } from "@utils/statuses";
import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "@utils/response";

const commentService: CommentService = new CommentService();

class CommentController {
    public static async createComment(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { commentText, authorId, threadId } = request.body;

            const comment = await commentService.createComment(commentText, authorId, threadId);

            sendSuccess(response, {
                statusCode: HTTPStatusCode.CREATED,
                meta: comment,
                ok: true,
                message: ResponseMessage.OK,
            });
        } catch(error) {
            next(error);
        }
    }
}

export default CommentController;