import { CustomButton } from "../../Button/Button"

export const TodoItem = ({ todo, editId, editText, setEditText, saveEdit, taskComplete, startEdit, deleteTodo }) => {
    return(
        <li key={todo.id} className='todo-outer__container'>
            {
                editId === todo.id ? (
                    <>
                    <input 
                        type="text"
                        value={editText}
                        onChange={(event) => setEditText(event.target.value)}
                        />
                         <CustomButton label="Save" hoverColor="green" onClick={() => saveEdit(editId)}/>
                    </>
                ) : (
                    <div className='todo-inner__container'>
                    <input type="checkbox" checked={todo.completed} onChange={() => taskComplete(todo.id)} />
                        <div className={todo.completed ? "completed": "todo-text"}>
                        {todo.text}
                        </div>
                        <div className='button__container'>
                        <CustomButton label="Edit" hoverColor="blue" onClick={() => startEdit(todo.id, todo.text)}/>
                        <CustomButton label="Delete" hoverColor="red" onClick={() => deleteTodo(todo.id)}/>
                        </div>
                    </div>
                )
            }
        </li>
    )
}