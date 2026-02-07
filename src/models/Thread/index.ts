import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IThread } from "@domains/Thread";

export interface IThreadCreationAttributes extends Optional<
    IThread,
    "id" | "createdAt" | "updatedAt"
> {}

export class Thread extends Model<IThread, IThreadCreationAttributes> {
    public id!: string;
    public title!: string;
    public description!: string;
    public author_id!: string;
    public topic_id!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export const initThreadModel = (sequelize: Sequelize): typeof Thread => {
    Thread.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            author_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            topic_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            underscored: true,
            tableName: "thread",
            timestamps: true,
        },
    );

    return Thread;
};
