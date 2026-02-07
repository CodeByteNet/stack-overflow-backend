import { DataTypes, Optional, Sequelize, Model } from "sequelize";
import { IComment } from "@domains/Comment";

export interface ICommentCreationAttributes extends Optional<
    IComment,
    "id" | "createdAt" | "updatedAt"
> {}

export class Comment extends Model<IComment, ICommentCreationAttributes> {
    public id!: string;
    public author_id!: string;
    public thread_id!: string;
    public comment_text!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export const initCommentModel = (sequelize: Sequelize): typeof Comment => {
    Comment.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            author_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            thread_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            comment_text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            underscored: true,
            tableName: "comment",
            timestamps: true,
        },
    );

    return Comment;
};
