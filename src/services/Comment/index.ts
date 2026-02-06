import { IComment } from "@domains/Comment";
import { Comment } from "@models/Comment";
import { sequelize } from "@models/index";
import { Transaction } from "sequelize";

class CommentService {
    public async createComment(
        commentText: string,
        authorId: string,
        threadId: string,
    ): Promise<IComment> {
        return sequelize.transaction(async (transaction: Transaction) => {
            const comment = await Comment.create(
                {
                    comment_text: commentText,
                    author_id: authorId,
                    thread_id: threadId,
                },
                { transaction },
            );

            return comment.get({ plain: true }) as IComment;
        });
    }
}

export default CommentService;
