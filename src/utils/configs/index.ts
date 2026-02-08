import { Dialect } from "sequelize";

export interface IDataBaseConfig {
    username: string,
    password: string,
    database: string,
    host: string,
    port: number,
    dialect: Dialect,
    logging: boolean,
};

type DialectEnv = Dialect | undefined;

export const dataBaseConfig: IDataBaseConfig = {
    username: process.env.POSTGRES_USER ?? "",
    password: process.env.POSTGRES_PASSWORD ?? "",
    database: process.env.POSTGRES_DATABASE ?? "",
    host: process.env.POSTGRES_HOST ?? "",
    port: Number(process.env.POSTGRES_PORT) ?? 5432,
    dialect: (process.env.DB_DIALECT as DialectEnv) ?? "postgres",
    logging: process.env.DB_LOGGING === String(true),
};

export interface ICreateTopicConfig {
    header: string;
    value: string;
};

export const createTopicConfig: ICreateTopicConfig = {
    header: "create-topic",
    value: process.env.CT_VALUE ?? "",
};