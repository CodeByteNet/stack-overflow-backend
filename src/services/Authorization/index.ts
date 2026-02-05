import UserService from "@services/User";
import { ErrorCode, ErrorMessage, HTTPStatusCode } from "@utils/statuses";
import { NAME_REGEX, PASSWORD_FORMAT_REGEXP } from "@utils/constants";
import { HTTPError } from "@utils/errors/HTTPError";

const userService = new UserService();

class AuthorizationService {
    public async signUp(nickname: string, password: string) {
        const normalizedNickname: string = nickname.trim();

        if(!NAME_REGEX.test(normalizedNickname)) {
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

        if(await userService.isUserExist(nickname)) {
            throw new HTTPError(
                HTTPStatusCode.BAD_REQUEST,
                ErrorMessage.USER_ALREADY_EXIST,
                ErrorCode.USER_ALREADY_EXIST,
            )
        }

        const user = await userService.createUser(normalizedNickname, password);

        return user;
    }

    public async signIn(nickname: string, password: string) {
        const normalizedNickname: string = nickname.trim();

        if(!NAME_REGEX.test(normalizedNickname)) {
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

        const user = userService.findUserByCredentials(normalizedNickname, password);

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