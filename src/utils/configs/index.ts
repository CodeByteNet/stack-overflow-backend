import { Dialect } from "sequelize";

export interface IDataBaseConfig {
    username: string,
    password: string,
    database: string,
    host: string,
    port: number,
    dialect: Dialect,
    logging: boolean,
}

type DialectEnv = Dialect | undefined;

const defaultDataBaseConfig: IDataBaseConfig = {
    username: "stack_overflow_user",
    password: "14112005%KIRILL",
    database: "stack_overflow_db",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: true,
}

export const dataBaseConfig: IDataBaseConfig = {
    username: process.env.DB_USERNAME ?? defaultDataBaseConfig.username,
    password: process.env.DB_PASSWORD ?? defaultDataBaseConfig.database,
    database: process.env.DB_NAME ?? defaultDataBaseConfig.database,
    host: process.env.DB_HOST ?? defaultDataBaseConfig.host,
    port: Number(process.env.DB_PORT) ?? defaultDataBaseConfig.port,
    dialect: (process.env.DB_DIALECT as DialectEnv) ?? defaultDataBaseConfig.dialect,
    logging: process.env.DB_LOGGING === String(defaultDataBaseConfig.logging),
}