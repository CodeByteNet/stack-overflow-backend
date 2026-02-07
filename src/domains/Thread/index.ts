export interface IThread {
    id: string,
    title: string,
    description: string,
    authorId: string,
    topicId: string,
    createdAt?: Date,
    updatedAt?: Date,
}