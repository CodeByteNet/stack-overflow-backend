const rawPort = Number.isNaN(Number(process.env.PORT));

export const SLICE_START_INDEX = 1;
export const SLICE_END_INDEX = -1;

const parseAllowedOrigins = (rawValue?: string): string[] => {
    if (!rawValue) {
        return [];
    }

    const trimmed = rawValue.trim();

    const normalized =
        trimmed.startsWith('[') && trimmed.endsWith(']')
            ? trimmed.slice(SLICE_START_INDEX, SLICE_END_INDEX)
            : trimmed;

    return normalized
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
};

export const ApplicationConfigDefault = {
    SERVICE_NAME: "stack-overflow-backend",
    DEFAULT_PORT: 3000,
    DEFAULT_IP: "127.0.0.1",
    CORS_ORIGINS: [],
};

export const applicationConfig = {
    name: ApplicationConfigDefault.SERVICE_NAME,
    nodeEnv: process.env.NODE_ENV ?? 'development',
    port: rawPort ? ApplicationConfigDefault.DEFAULT_PORT : rawPort,
    id: process.env.IP ?? ApplicationConfigDefault.DEFAULT_IP,
    allowedCorsOrigins: !process.env.CORS_ORIGINS ? ApplicationConfigDefault.CORS_ORIGINS : parseAllowedOrigins(process.env.CORS_ORIGINS),
}