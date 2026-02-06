import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { ITopic } from "@domains/User";

export interface ITopicCreationAttributes extends Optional<
    ITopic,
    "id" | "createdAt" | "updatedAt"
> {}

export class Topic extends Model<ITopic, ITopicCreationAttributes> {
    public id!: string;
    public name!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export const initTopicModel = (sequelize: Sequelize): typeof Topic => {
    Topic.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            underscored: true,
            tableName: "topic",
            timestamps: true,
        }
    )

    return Topic;
}