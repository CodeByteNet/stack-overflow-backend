import AuthorizationService from "@services/Authorization";
import UserService from "@services/User";
import { sendSuccess } from "@utils/response";
import { HTTPStatusCode, ResponseMessage } from "@utils/statuses";
import { NextFunction, Request, Response } from "express";

const userService: UserService = new UserService();

const authorizationService: AuthorizationService = new AuthorizationService();

class AuthorizationController {
    public static async checkUserExist(
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const normalizedNickname: string = (request.params.nickname as string).trim();

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