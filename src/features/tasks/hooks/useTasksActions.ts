import { useState } from "react";
import {
  addTask,
  deleteTask,
  updateTaskText,
  updateTaskStatus,
  getNextStatus,
} from "../../tasks/service/taskServices";
import { addProject } from "../../projects/service/projectService";

type Params = {
  user: any;
  activeTeamId: string | null;
  tasks: any[];
};

export const useTaskActions = ({
  user,
  activeTeamId,
  tasks,
}: Params) => {
  const [error, setError] = useState<string | null>(null);

  // ADD TASK
  const addTodo = async (
    text: string,
    selectedProject: string | null,
    dueDate: string,
    assignedTo: string
  ) => {
    try {
      if (!user || !activeTeamId) return;
      if (text.trim() === "") return;

      await addTask(user.uid, activeTeamId, text, selectedProject, dueDate, assignedTo);
    } catch (err) {
      console.error(err);
      setError("Failed to add todo");
    }
  };

  // DELETE TASK
  const deleteTodo = async (id: string) => {
    try {
      await deleteTask(id);
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  // EDIT TASK
  const saveEdit = async (id: string, text: string) => {
    try {
      await updateTaskText(id, text);
    } catch (err) {
      console.error(err);
      setError("Failed to save task");
    }
  };

  // TOGGLE STATUS
  const taskComplete = async (id: string) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      const nextStatus = getNextStatus(task.status);

      await updateTaskStatus(id, nextStatus);
    } catch (err) {
      console.error(err);
      setError("Failed to update task");
    }
  };

  // CLEAR COMPLETED
  const clearCompleted = async () => {
    try {
      const completedTasks = tasks.filter((t) => t.status === "done");

      await Promise.all(
        completedTasks.map((task) => deleteTask(task.id))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to clear completed tasks");
    }
  };

  // ADD PROJECT (optional but keeps consistency)
  const handleAddProject = async (name: string) => {
    try {
      if (!activeTeamId || !name.trim()) return;

      await addProject(activeTeamId, name, user.uid);
    } catch (err) {
      console.error(err);
      setError("Failed to add project");
    }
  };

  return {
    addTodo,
    deleteTodo,
    saveEdit,
    taskComplete,
    clearCompleted,
    handleAddProject,
    error,
  };
};