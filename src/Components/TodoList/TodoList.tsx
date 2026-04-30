import { TodoItem } from "./TodoItem/TodoItem";
import { Task } from "../../types/Task";

type TodoListProps = {
  filteredTasks: Task[];
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
    filteredTasks,
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
            {filteredTasks.map((task) =>(
                <TodoItem
                    key={task.id}
                    task={task}
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