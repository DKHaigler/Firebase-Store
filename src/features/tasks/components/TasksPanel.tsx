import { useState } from "react";
import {
  deleteTask,
  updateTaskText,
  updateTaskStatus,
  addTask,
  getNextStatus,
} from "../../../services/taskServices";

import { useTasks } from "../hooks/useTasks";
import { useTeam } from "../../../context/TeamContext";

import { TodoInput } from "./TodoInput/TodoInput";
import { TodoList } from "./TodoList/TodoList";

import { CustomButton } from "../../../Components/UI/Button/Button";

import "./TasksPanel.css";

type TasksPanelProps = {
  user: any;
};

export const TasksPanel: React.FC<TasksPanelProps> = ({ user }) => {
  const { tasks, loading } = useTasks();
  const { activeTeamId } = useTeam();

  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<
    "all" | "todo" | "in-progress" | "done"
  >("all");

  // ADD TASK
  const addTodo = async () => {
    try {
      if (!user || !activeTeamId) return;
      if (newTodo.trim() === "") return;

      await addTask(user.uid, activeTeamId, newTodo, null);

      setNewTodo("");
    } catch (err) {
      console.error(err);
      setError("Failed to add todo");
    }
  };

  // DELETE TASK
  const deleteTodo = async (id: string) => {
    try {
      await deleteTask(id);
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      setError("Failed to delete task");
    }
  };

  // START EDIT
  const startEdit = (id: string, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  // SAVE EDIT
  const saveEdit = async (id: string) => {
    try {
      await updateTaskText(id, editText);

      setEditId(null);
      setEditText("");
    } catch (err) {
      console.error(err);
      setError("Failed to save task");
    }
  };

  // TASK STATUS
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

  // FILTER TASKS
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;

    return task.status === filter;
  });

  // TASK COUNT
  const activeCount = tasks.filter(
    (task) => task.status !== "done"
  ).length;

  // COMPLETED TASKS
  const hasCompleted = tasks.some(
    (task) => task.status === "done"
  );

  // CLEAR COMPLETED
  const clearCompleted = async () => {
    try {
      const completedTasks = tasks.filter(
        (task) => task.status === "done"
      );

      await Promise.all(
        completedTasks.map((task) => deleteTask(task.id))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to clear completed tasks");
    }
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="tasks-panel">
      <TodoInput
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        addTodo={addTodo}
      />

      <div className="filters">
        <CustomButton
          label="All"
          hoverColor="white"
          onClick={() => setFilter("all")}
          active={filter === "all"}
        />

        <CustomButton
          label="Todo"
          hoverColor="red"
          onClick={() => setFilter("todo")}
          active={filter === "todo"}
        />

        <CustomButton
          label="In-Progress"
          hoverColor="yellow"
          onClick={() => setFilter("in-progress")}
          active={filter === "in-progress"}
        />

        <CustomButton
          label="Done"
          hoverColor="green"
          onClick={() => setFilter("done")}
          active={filter === "done"}
        />
      </div>

      <div className="tasks__container">
        <p>
          {activeCount}{" "}
          {activeCount === 1 ? "task" : "tasks"} remaining
        </p>

        {hasCompleted && (
          <CustomButton
            label="Clear Completed"
            hoverColor="green"
            onClick={clearCompleted}
          />
        )}
      </div>

      {filteredTasks.length === 0 && (
        <p className="empty-state">
          No tasks here yet
        </p>
      )}

      {filteredTasks.length > 0 && (
        <TodoList
          filteredTasks={filteredTasks}
          editId={editId}
          editText={editText}
          setEditText={setEditText}
          startEdit={startEdit}
          saveEdit={saveEdit}
          deleteTodo={deleteTodo}
          taskComplete={taskComplete}
          setDeleteId={setDeleteId}
        />
      )}

      {deleteId !== null && (
        <div className="delete-modal">
          <p>
            Are you sure you want to delete this task?
          </p>

          <CustomButton
            label="Cancel"
            hoverColor="green"
            onClick={() => setDeleteId(null)}
          />

          <CustomButton
            label="Delete"
            hoverColor="red"
            onClick={() => deleteTodo(deleteId)}
          />
        </div>
      )}
    </div>
  );
};