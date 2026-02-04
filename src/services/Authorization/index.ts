import UserService from "../User";
import { ErrorCode, ErrorMessage, HTTPStatusCode } from "../../utils/statuses";
import { NAME_REGEX, PASSWORD_FORMAT_REGEXP } from "../../utils/constants";
import { HTTPError } from "../../utils/errors/HTTPError";
import { User } from "../../models/User";

const userService = new UserService();

class AuthorizationService {
    public async checkUserExist(nickname: string): Promise<void> {
        const user = await User.findOne({ where: {nickname: nickname}});

        if(user) {
            throw new HTTPError(
                HTTPStatusCode.BAD_REQUEST,
                ErrorMessage.USER_ALREADY_EXIST,
                ErrorCode.USER_ALREADY_EXIST,
            )
        }
    }

    public async signUp(nickname: string, password: string) {
        if(!NAME_REGEX.test(nickname)) {
            throw new HTTPError(
                HTTPStatusCode.BAD_REQUEST,
                ErrorMessage.INCORRECTED_NICKNAME,
                ErrorCode.INCORRECTED_NICKNAME,
            )
        }

        if(!PASSWORD_FORMAT_REGEXP.test(password)) {
            throw new HTTPError(
                HTTPStatusCode.BAD_REQUEST,
                ErrorMessage.INCORRECTED_PASSWORD,
                ErrorCode.INCORRECTED_PASSWORD,
            )
        }

        await this.checkUserExist(nickname);

        const user = await userService.createUser(nickname, password);

        return user;
    }

    public async signIn(nickname: string, password: string) {
        if(!NAME_REGEX.test(nickname)) {
            throw new HTTPError(
                HTTPStatusCode.BAD_REQUEST,
                ErrorMessage.INCORRECTED_NICKNAME,
                ErrorCode.INCORRECTED_NICKNAME,
            )
        }

        if(!PASSWORD_FORMAT_REGEXP.test(password)) {
            throw new HTTPError(
                HTTPStatusCode.BAD_REQUEST,
                ErrorMessage.INCORRECTED_PASSWORD,
                ErrorCode.INCORRECTED_PASSWORD,
            )
        }

        const user = userService.findUserByCredentials(nickname, password);

        if(!user) {
            throw new HTTPError(
                HTTPStatusCode.BAD_REQUEST,
                ErrorMessage.USER_ENTITY_NOT_FOUND,
                ErrorCode.USER_ENTITY_NOT_FOUND,
            )
        }

        return user;
    }
}

export default AuthorizationService;