import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IUser } from "../../domains/User";

export interface IUserCreationAttributes
    extends Optional<IUser, "id" | "createdAt" | "updatedAt"> {}

export class User extends Model<IUser, IUserCreationAttributes> {
    public id!: string;
    public nickname!: string;
    public password!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export const initUserModel = (sequelize: Sequelize): typeof User => {
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            underscored: true,
            tableName: "user",
            timestamps: true,
        }
    )

    return User;
}
