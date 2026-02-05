import { applicationConfig } from "@utils/configs/applicationConfig";
import { Paths } from "@utils/constants";
import { Options } from "swagger-jsdoc";

const definition = {
    openapi: "3.0.3",
    info: {
        title: "stack-overflow-backend",
        version: "1.0.0",
        descriprion: "API documentation for the Stack overflow backend",
    },
    servers: [
        {
            url: `http://localhost:${applicationConfig.port}`,
            description: "Local development server",
        },
    ],
    components: {
        schemas: {

        }
    },
    externalDocs: {
        description: `Swagger UI exponsed under ${Paths.DOCS_PATH}`,
        url: Paths.DOCS_PATH,
    },
};

export const swaggerConfig: Options = {
    definition,
    apis: ["src/routes/**/*.ts"],
}