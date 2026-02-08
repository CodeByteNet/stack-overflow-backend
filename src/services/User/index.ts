import bcrypt from 'bcrypt';
import { ErrorCode, ErrorMessage, HTTPStatusCode } from '@utils/statuses';
import { HTTPError } from '@utils/errors/HTTPError';
import { sequelize } from "@models/index";
import { Transaction } from "sequelize";
import { IUser } from "@domains/User";
import { User } from "@models/User";

class UserService {
    public async isUserExist(nickname: string): Promise<boolean> {
        const user = await User.findOne({ where: {nickname: nickname}});

        return !!user;
    }

    public async getAllUsers(): Promise<IUser[]> {
        const users = await User.findAll();

        return users.map((user) => user.get({ plain: true }) as IUser);
    }

    public async findUserByCredentials(nickname: string, password: string) {
        const user = await User.findOne({ where: { nickname: nickname }})

        if(!user) {
            return user;
        }

        if(!(await bcrypt.compare(password, user.password))) {
            throw new HTTPError(
                HTTPStatusCode.BAD_REQUEST,
                ErrorMessage.INCORRECTED_PASSWORD,
                ErrorCode.INCORRECTED_PASSWORD,
            )
        }

        return user;
    }

    public async createUser(nickname: string, password: string) {
        return sequelize.transaction(async (transaction: Transaction) => {
            const salt: number = 10;
            
            const hashedPassword: string = await bcrypt.hash(password, bcrypt.genSaltSync(salt));

            const user = await User.create(
                {
                    nickname: nickname,
                    password: hashedPassword,
                },
                { transaction }
            );

            return user.get({ plain: true }) as IUser;
        })
    }
}

export default UserService;