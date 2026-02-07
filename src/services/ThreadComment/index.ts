import { IThreadComment } from "@domains/ThreadComment";
import { ThreadComment } from "@models/ThreadComment";
import { sequelize } from "@models/index";
import { Transaction } from "sequelize";

class ThreadCommentService {
    public async createThreadComment(
        ThreadCommentText: string,
        authorId: string,
        threadId: string,
    ): Promise<IThreadComment> {
        return sequelize.transaction(async (transaction: Transaction) => {
            const threadComment = await ThreadComment.create(
                {
                    ThreadComment_text: ThreadCommentText,
                    authorId: authorId,
                    threadId: threadId,
                },
                { transaction },
            );

            return threadComment.get({ plain: true }) as IThreadComment;
        });
    }
}

export default ThreadCommentService;
