import { Task } from "../../features/tasks/types/Task"; 

export const isTaskOverdue = (task: Task) => {
  if (!task.dueDate) return false;

  return (
    task.status !== "done" &&
    new Date(task.dueDate) < new Date()
  );
};