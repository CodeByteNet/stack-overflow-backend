import { ErrorCode, ErrorMessage, HTTPStatusCode } from "@utils/statuses";
import { IThreadComment } from "@domains/ThreadComment";
import { ThreadComment } from "@models/ThreadComment";
import { HTTPError } from "@utils/errors/HTTPError";
import { IThread } from "@domains/Thread";
import { sequelize } from "@models/index";
import { Thread } from "@models/Thread";
import { Transaction } from "sequelize";

interface IThreadContent {
    id: string;
    title: string;
    description: string;
    comments: IThreadComment[];
}

class ThreadService {
    public async getAllThreadsByTopicId(topicId: string): Promise<IThread[]> {
        const threads = await Thread.findAll({ where: { topicId: topicId } });

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
                    authorId: authorId,
                    topicId: topicId,
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

        const ThreadComments = await ThreadComment.findAll({
            where: { threadId: threadId },
        });

        return {
            id: thread.id,
            title: thread.title,
            description: thread.description,
            comments: ThreadComments,
        };
    }
}

export default ThreadService;
