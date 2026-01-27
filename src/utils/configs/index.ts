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

export const dataBaseConfig: IDataBaseConfig = {
    username: process.env.DB_USERNAME ?? "",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "",
    host: process.env.DB_HOST ?? "",
    port: Number(process.env.DB_PORT) ?? 5432,
    dialect: (process.env.DB_DIALECT as DialectEnv) ?? "postgres",
    logging: process.env.DB_LOGGING === String(true),
}