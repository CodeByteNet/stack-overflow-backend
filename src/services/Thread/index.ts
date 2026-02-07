import { ErrorCode, ErrorMessage, HTTPStatusCode } from "@utils/statuses";
import { HTTPError } from "@utils/errors/HTTPError";
import { IComment } from "@domains/Comment";
import { Comment } from "@models/Comment";
import { IThread } from "@domains/Thread";
import { sequelize } from "@models/index";
import { Thread } from "@models/Thread";
import { Transaction } from "sequelize";

interface IThreadContent {
    id: string;
    title: string;
    description: string;
    comments: IComment[];
}

class ThreadService {
    public async getAllThreadsByTopicId(topicId: string): Promise<IThread[]> {
        const threads = await Thread.findAll({ where: { topic_id: topicId } });

        return threads.map((thread) => thread.get({ plain: true }) as IThread);
    }

    public async createThread(
        title: string,
        description: string,
        topicId: string,
        authorId: string,
    ): Promise<IThread> {
        return sequelize.transaction(async (transaction: Transaction) => {
            const thread = await Thread.create(
                {
                    title: title,
                    description: description,
                    author_id: authorId,
                    topic_id: topicId,
                },
                { transaction },
            );

            return thread.get({ plain: true }) as IThread;
        });
    }

    public async getThreadContentByThreadId(
        threadId: string,
    ): Promise<IThreadContent> {
        const thread = await Thread.findOne({ where: { id: threadId } });

        if (!thread) {
            throw new HTTPError(
                HTTPStatusCode.NOT_FOUND,
                ErrorMessage.THREAD_NOT_FOUND,
                ErrorCode.THREAD_NOT_FOUND,
            );
        }

        const comments = await Comment.findAll({
            where: { thread_id: threadId },
        });

        return {
            id: thread.id,
            title: thread.title,
            description: thread.description,
            comments: comments,
        };
    }
}

export default ThreadService;
