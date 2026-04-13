import { TodoItem } from "./TodoItem/TodoItem";
import { Todo } from "../../types/Todo";

type TodoListProps = {
  filteredTodos: Todo[];
  editId: string | null;
  editText: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  startEdit: (id: string, text: string) => void;
  saveEdit: (id: string) => void;
  deleteTodo: (id: string) => void;
  taskComplete: (id: string) => void;
  setDeleteId: (id: string) => void;
};

export const TodoList:React.FC<TodoListProps> = ({
    filteredTodos,
    editId,
    editText,
    setEditText,
    startEdit,
    saveEdit,
    deleteTodo,
    taskComplete,
    setDeleteId
}) => {
    return (
        <ul>
            {filteredTodos.map((todo) =>(
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    editId={editId}
                    editText={editText}
                    setEditText={setEditText}
                    startEdit={startEdit}
                    saveEdit={saveEdit}
                    deleteTodo={deleteTodo}
                    taskComplete={taskComplete}
                    setDeleteId={setDeleteId}
                />
            ))}
        </ul>
    )
}