import { useEffect, useState } from "react";
import { Todo } from "../types/Todo";


import {
  subscribeToTodos,
  addTodo,
  deleteTodo,
  updateTodoText,
  toggleTodoComplete,
  clearCompletedTodos
} from "../services/todoServices";

export const useTodos = (activeTeamId: string | null) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeTeamId) return;

    const unsubscribe = subscribeToTodos(
      activeTeamId,
      (snapshot: any) => {
        setTodos(
          snapshot.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id
          }))
        );
        setLoading(false);
      },
      (err: any) => {
        console.error(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [activeTeamId]);

  return {
    todos,
    loading,
    addTodo,
    deleteTodo,
    updateTodoText,
    toggleTodoComplete,
    clearCompletedTodos
  };
};