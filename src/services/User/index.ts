import { ErrorCode, ErrorMessage, HTTPStatusCode } from "../../utils/statuses";
import { HTTPError } from "../../utils/errors/HTTPError";
import { IUser } from "../../domains/User";
import { User } from "../../models/User";
import { sequelize } from "../../models";
import { Transaction } from "sequelize";

class UserService {
    public async getAllUsers(): Promise<IUser[]> {
        const users = await User.findAll();

        if(!users) {
            throw new HTTPError(
                HTTPStatusCode.NO_CONTENT,
                ErrorMessage.USERS_ENTITYES_NOT_FOUND,
                ErrorCode.USERS_ENTITYES_NOT_FOUND,
            )
        }

        return users.map((user) => user.get({ plain: true }) as IUser);
    }

    public async createUser(nickname: string, password: string) {
        return sequelize.transaction(async (transaction: Transaction) => {
            const user = await User.create(
                {
                    nickname: nickname,
                    password: password,
                },
                { transaction }
            );

            return user.get({ plain: true }) as IUser;
        })
    }
}

export default UserService;