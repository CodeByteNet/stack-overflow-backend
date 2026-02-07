import { DataTypes, Optional, Sequelize, Model } from "sequelize";
import { IThreadComment } from "@domains/ThreadComment";

export interface IThreadCommentCreationAttributes extends Optional<
    IThreadComment,
    "id" | "createdAt" | "updatedAt"
> {}

export class ThreadComment extends Model<IThreadComment, IThreadCommentCreationAttributes> {
    public id!: string;
    public author_id!: string;
    public thread_id!: string;
    public ThreadComment_text!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export const initThreadCommentModel = (sequelize: Sequelize): typeof ThreadComment => {
    ThreadComment.init(
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
            ThreadComment_text: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            underscored: true,
            tableName: "ThreadComment",
            timestamps: true,
        },
    );

    return ThreadComment;
};
