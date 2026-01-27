import { ApplicationConfigDefault } from "./../../constants";

const rawPort = Number.isNaN(Number(process.env.PORT));

export const applicationConfig = {
    name: ApplicationConfigDefault.SERVICE_NAME,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: rawPort ? ApplicationConfigDefault.DEFAULT_PORT : rawPort,
    id: process.env.IP ?? ApplicationConfigDefault.DEFAULT_IP,
}