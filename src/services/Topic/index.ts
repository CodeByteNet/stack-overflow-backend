import { sequelize } from "@models/index";
import { Transaction } from "sequelize";
import { ITopic } from "@domains/User";
import { Topic } from "@models/Topic";

class TopicService {
    public async getAllTopics(): Promise<ITopic[]> {
        const topics = await Topic.findAll();

        return topics.map((topic) => topic.get({ plain: true }) as ITopic);
    }

    public async createTopic(name: string) {
        return sequelize.transaction(async (transaction: Transaction) => {
            const topic = await Topic.create(
                {
                    name: name,
                },
                { transaction },
            );

            return topic.get({ plain: true }) as ITopic;
        })
    }
}

export default TopicService;