export interface IThread {
    id: string,
    title: string,
    description: string,
    author_id: string,
    topic_id: string,
    createdAt?: Date,
    updatedAt?: Date,
}