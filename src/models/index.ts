import { dataBaseConfig } from "@utils/configs";
import { initUserModel } from "@models/User";
import { Sequelize } from "sequelize";

const initializeModels = (): void => {
    initUserModel(sequelize);
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