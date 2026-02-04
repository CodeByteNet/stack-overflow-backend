import { applicationConfig } from "../../utils/configs/applicationConfig";
import { CorsOptions } from "cors";

export const ApplicationConfigDefault = {
    SERVICE_NAME: "stack-overflow-backend",
    DEFAULT_PORT: 3000,
    DEFAULT_IP: "127.0.0.1",
    CORS_ORIGINS: [],
};

export const Paths = {
    DOCS_PATH: "/docs",
};

const enum AllowedCorsMethods {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
}

export const corsOptions: CorsOptions = {
    origin: applicationConfig.allowedCorsOrigins,
    methods: [
        AllowedCorsMethods.GET,
        AllowedCorsMethods.POST,
        AllowedCorsMethods.PATCH,
    ],
};
