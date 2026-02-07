import { IThreadStatistic } from "@domains/ThreadStatistic";
import { ThreadStatistic } from "@models/ThreadStatistic";
import { sequelize } from "@models/index";
import { HTTPError } from "@utils/errors/HTTPError";
import { ErrorCode, ErrorMessage, HTTPStatusCode } from "@utils/statuses";
import { Transaction } from "sequelize";

class ThreadStatisticService {
    public async createStatistic(threadId: string): Promise<IThreadStatistic> {
        return sequelize.transaction(async (transaction: Transaction) => {
            const threadStatistic = await ThreadStatistic.create(
                {
                    thread_id: threadId,
                    views_count: 0,
                },
                {
                    transaction,
                },
            );

            return threadStatistic.get({ plain: true }) as IThreadStatistic;
        });
    }

    public async getThreadStatisticByThreadId(
        threadId: string,
    ): Promise<ThreadStatistic | null> {
        const threadStatistic = await ThreadStatistic.findOne({
            where: { thread_id: threadId },
        });

        return threadStatistic;
    }

    public async updateTreadStatisticsByThreadId(
        threadId: string,
    ): Promise<IThreadStatistic> {
        const threadStatistic = await ThreadStatistic.findOne({
            where: { thread_id: threadId },
        });

        if(!threadStatistic) {
            throw new HTTPError(
                HTTPStatusCode.NOT_FOUND,
                ErrorMessage.THREAD_NOT_FOUND,
                ErrorCode.THREAD_NOT_FOUND,
            )
        }

        threadStatistic.views_count = threadStatistic.views_count + 1;

        await threadStatistic.save();

        return threadStatistic.get({ plain: true });
    }
}

export default ThreadStatisticService;
