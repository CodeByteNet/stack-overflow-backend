export interface IComment {
    id: string,
    author_id: string,
    thread_id: string,
    comment_text: string,
    createdAt?: Date,
    updatedAt?: Date,
}