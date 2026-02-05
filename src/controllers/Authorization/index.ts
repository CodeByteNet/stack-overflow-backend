import UserService from "@services/User";
import AuthorizationService from "@services/Authorization";
import { ErrorCode, ErrorMessage, HTTPStatusCode, ResponseMessage } from "@utils/statuses";
import { NextFunction, Request, Response } from "express";
import { sendSuccess } from "@utils/response";
import { isString } from "@utils/typeGuards";
import { HTTPError } from "@utils/errors/HTTPError";

const userService: UserService = new UserService();

const authorizationService: AuthorizationService = new AuthorizationService();

class AuthorizationController {
    public static async checkUserExist(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const normalizedNickname: string = (request.query.nickname as string).trim();

            const isUserExist: boolean = await userService.isUserExist(normalizedNickname)

            sendSuccess(response, {
                statusCode: HTTPStatusCode.OK,
                meta: isUserExist,
                ok: true,
                message: ResponseMessage.OK,
            })
        } catch(error) {
            next(error);
        }
    };
    
    public static async signUp(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { nickname, password } = request.body;
            
            if(!isString(nickname)) {
                throw new HTTPError(
                    HTTPStatusCode.BAD_REQUEST,
                    ErrorMessage.INCORRECTED_NICKNAME,
                    ErrorCode.INCORRECTED_NICKNAME,
                )
            }

            if(!isString(password)) {
                throw new HTTPError(
                    HTTPStatusCode.BAD_REQUEST,
                    ErrorMessage.INCORRECTED_PASSWORD,
                    ErrorCode.INCORRECTED_PASSWORD,
                )
            }

            const user = await authorizationService.signUp(nickname, password);

            sendSuccess(response, {
                statusCode: HTTPStatusCode.CREATED,
                meta: user,
                ok: true,
                message: ResponseMessage.OK,
            })
        } catch(error) {
            next(error);
        }
    }

    public static async signIn(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { nickname, password } = request.body;

            if(!isString(nickname)) {
                throw new HTTPError(
                    HTTPStatusCode.BAD_REQUEST,
                    ErrorMessage.INCORRECTED_NICKNAME,
                    ErrorCode.INCORRECTED_NICKNAME,
                )
            }

            if(!isString(password)) {
                throw new HTTPError(
                    HTTPStatusCode.BAD_REQUEST,
                    ErrorMessage.INCORRECTED_PASSWORD,
                    ErrorCode.INCORRECTED_PASSWORD,
                )
            }

            const user = await authorizationService.signIn(nickname, password);

            sendSuccess(response, {
                statusCode: HTTPStatusCode.OK,
                meta: user,
                ok: true,
                message: ResponseMessage.OK,
            })
        } catch(error) {
            next(error);
        }
    }
}

export default AuthorizationController;