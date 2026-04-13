export type Todo = {
    id: string
    text: string
    completed: boolean
    uid: string
    folderId?: string | null;
}