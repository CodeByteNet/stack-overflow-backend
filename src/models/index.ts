import { initThreadStatisticModel } from "@models/ThreadStatistic";
import { initCommentModel, Comment } from "@models/Comment";
import { dataBaseConfig } from "@utils/configs";
import { initTopicModel } from "@models/Topic";
import { initUserModel, User } from "@models/User";
import { Sequelize } from "sequelize";

const initializeModels = (): void => {
    initUserModel(sequelize);
    initTopicModel(sequelize);
    initCommentModel(sequelize);
    initThreadStatisticModel(sequelize);

    User.hasMany(Comment, { foreignKey: "id", as: "comment"});
    Comment.belongsTo(User, { foreignKey: "author_id", as: "user"});
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