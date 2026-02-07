import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { IThreadStatistic } from "@domains/ThreadStatistic";

export interface IThreadStatisticCreationAttributes extends Optional<
    IThreadStatistic,
    "id" | "createdAt" | "updatedAt"
> {}

export class ThreadStatistic extends Model<IThreadStatistic, IThreadStatisticCreationAttributes> {
    public id!: string;
    public threadId!: string;
    public viewsCount!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

export const initThreadStatisticModel = (sequelize: Sequelize): typeof ThreadStatistic => {
    ThreadStatistic.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            threadId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            viewsCount: {
                type: DataTypes.STRING,
                defaultValue: 0,
                allowNull: true,
            },
        },
        {
            sequelize,
            underscored: true,
            tableName: "threadStatistic",
            timestamps: true,
        }
    )

    return ThreadStatistic;
}