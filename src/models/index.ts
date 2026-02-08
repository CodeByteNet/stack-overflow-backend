import { initThreadStatisticModel } from "@models/ThreadStatistic";
import { initThreadCommentModel, ThreadComment } from "@models/ThreadComment";
import { initThreadModel, Thread } from "@models/Thread";
import { initUserModel, User } from "@models/User";
import { dataBaseConfig } from "@utils/configs";
import { initTopicModel } from "@models/Topic";
import { Sequelize } from "sequelize";

const initializeModels = (): void => {
    initUserModel(sequelize);
    initTopicModel(sequelize);
    initThreadModel(sequelize);
    initThreadCommentModel(sequelize);
    initThreadStatisticModel(sequelize);

    User.hasMany(ThreadComment, { foreignKey: "author_id", as: "ThreadComments" });
    ThreadComment.belongsTo(User, { foreignKey: "author_id", as: "author" });

    Thread.hasMany(ThreadComment, { foreignKey: "thread_id", as: "ThreadComment"});
    ThreadComment.belongsTo(Thread, { foreignKey: "thread_id", as: "thread"});
}

export const sequelize = new Sequelize(
    dataBaseConfig.database,
    dataBaseConfig.username,
    dataBaseConfig.password,
    {
        host: dataBaseConfig.host,
        port: dataBaseConfig.port,
        dialect: dataBaseConfig.dialect,
        logging: dataBaseConfig.logging === true,
        define: {
            underscored: true,
        },
    }
);

export const connectToDatabase = async () => {
    initializeModels();
    await sequelize.authenticate();
    await sequelize.sync();
}