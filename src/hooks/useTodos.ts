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

export const useTodos = (user: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToTodos(
      user.uid,
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
  }, [user]);

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