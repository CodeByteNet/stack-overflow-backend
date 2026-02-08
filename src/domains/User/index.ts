export interface IUser {
    id: string,
    nickname: string,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface ITopic {
    id: string,
    name: string,
    createdAt?: Date,
    updatedAt?: Date,
}