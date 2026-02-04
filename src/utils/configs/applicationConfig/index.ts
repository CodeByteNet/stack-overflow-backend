import { ApplicationConfigDefault } from "./../../constants";

const rawPort = Number.isNaN(Number(process.env.PORT));

export const applicationConfig = {
    name: ApplicationConfigDefault.SERVICE_NAME,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: rawPort ? ApplicationConfigDefault.DEFAULT_PORT : rawPort,
    id: process.env.IP ?? ApplicationConfigDefault.DEFAULT_IP,
    allowedCorsOrigins: !process.env.CORS_ORIGINS ? ApplicationConfigDefault.CORS_ORIGINS : JSON.parse(process.env.CORS_ORIGINS),
}