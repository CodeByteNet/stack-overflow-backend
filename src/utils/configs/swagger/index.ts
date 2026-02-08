import { applicationConfig } from "@utils/configs/applicationConfig";
import { Paths } from "@utils/constants";
import { Options } from "swagger-jsdoc";

const successResponseSchema = {
    type: "object",
    properties: {
        ok: {
            type: "boolean",
            example: true,
        },
        message: {
            type: "string",
            example: "Request completed successfully",
        },
        meta: {
            oneOf: [
                { type: "object" },
                { type: "array", items: {} },
                { type: null },
            ],
        },
    },
    require: ["ok", "meta", "message"],
};

const errorResponseSchema = {
    type: "object",
    properties: {
        ok: {
            type: "boolean", example: "false",
        },
        error: {
            type: "object",
            properties: {
                code: { type: "string", example: "BAD_CREDENTIALS"},
                message: { type: "string", example: "Bad credentials"},
            },
            require: ["code", "message"],
        },
    },
    require: ["ok", "error"],
};

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
            SuccessResponse: successResponseSchema,
            ErrorResponse: errorResponseSchema,
            UserEntity: {
                type: "object",
                properties: {
                    id: { type: "string", format: "uuid" },
                    nickname: { type: "string" },
                    password: { type: "string" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" },
                },
                require: [
                    "id",
                    "nickname",
                    "password",
                    "createdAt",
                    "updatedAt",
                ],
            },
            UserCreateRequest: {
                type: "object",
                properties: {
                    nickname: {
                        type: "string",
                        example: "Kirill"
                    },
                    password: {
                        type: "string",
                        example: "12345?Password",
                    },
                },
                require: [
                    "nickname",
                    "password",
                ],
            },
            UserCreateResponse: {
                allOf: [
                    { $ref: "#/components/schemas/SuccessResponse" },
                    {
                        properties: {
                            meta: {
                                $ref: "#components/schemas/UserEntity",
                            },
                        },
                    },
                ],       
            },
            UserRequestEntity: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        format: "uuid",
                    },
                    nickname: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                },
                require: [
                    "id",
                    "nickname",
                    "password",
                ],
            },
            UserResponse: {
                allOf: [
                    { $ref: "#/components/schemas/SuccessResponse"},
                    {
                        properties: {
                            meta: {
                                type: "array",
                                items: { $ref: "#/components/schemas/UserEntity" },
                            },
                        },
                    },
                ],
            },
        },
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