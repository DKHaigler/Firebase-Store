export type Todo = {
    id: string
    text: string
    completed: boolean
    uid: string
    teamId: string
    folderId?: string | null;
}