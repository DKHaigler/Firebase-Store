type Task = {
  id: string
  text: string
  teamId: string
  folderId: string
  status: "todo" | "in-progress" | "done"
}