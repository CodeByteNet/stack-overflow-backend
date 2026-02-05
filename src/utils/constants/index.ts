import { applicationConfig } from "@utils/configs/applicationConfig";
import { CorsOptions } from "cors";

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

export const PASSWORD_FORMAT_REGEXP: RegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const NAME_REGEX = /^[a-zA-Z0-9]{3,}$/;