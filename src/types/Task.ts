export type TaskStatus = "todo" | "in-progress" | "done"


export type Task = {
  id: string
  text: string
  teamId: string
  folderId: string
  status: TaskStatus
  createdBy: string
}