import { dataBaseConfig } from "./../utils/configs";
import { Sequelize } from "sequelize";

// const initializeModels = (): void => {

// }

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
    // initializeModels();
    await sequelize.authenticate();
    await sequelize.sync();
}