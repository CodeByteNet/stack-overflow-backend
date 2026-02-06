import { IThread } from "@domains/Thread";
import { sequelize } from "@models/index";
import { Thread } from "@models/Thread";
import { Transaction } from "sequelize";

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
}

export default ThreadService;
