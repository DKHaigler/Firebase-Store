import { TodoItem } from "./TodoItem/TodoItem";

export const TodoList = ({
    todos,
    editId,
    editText,
    setEditText,
    startEdit,
    saveEdit,
    deleteTodo,
    taskComplete
}) => {
    return (
        <ul>
            {todos.map((todo) =>(
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
                />
            ))}
        </ul>
    )
}