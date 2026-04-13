import { CustomButton } from "../../Button/Button"
import { Todo } from "../../../types/Todo"

type TodoItemProps = {
  todo: Todo;
  editId: string | null;
  editText: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  saveEdit: (id: string) => void;
  taskComplete: (id: string) => void;
  startEdit: (id: string, text: string) => void;
  deleteTodo: (id: string) => void;
  setDeleteId: (id:string) => void;
};

export const TodoItem = ({ todo, editId, editText, setEditText, saveEdit, taskComplete, startEdit, setDeleteId, }: TodoItemProps) => {
    return(
        <li className='todo-outer__container'>
            {
                editId === todo.id ? (
                    <div className="save-todo">
                    <input 
                        type="text"
                        value={editText}
                        onChange={(event) => setEditText(event.target.value)}
                    />
                     <CustomButton label="Save" hoverColor="green" onClick={() => editId && saveEdit(editId)}/>
                    </div>
                ) : (
                    <div className='todo-inner__container'>
                    <input type="checkbox" checked={todo.completed} onChange={() => taskComplete(todo.id)} />
                        <div className={todo.completed ? "completed": "todo-text"}>
                        {todo.text}
                        </div>
                        <div className='button__container'>
                        <CustomButton label="Edit" hoverColor="blue" onClick={() => startEdit(todo.id, todo.text)}/>
                        <CustomButton label="Delete" hoverColor="red" onClick={() => {

                            console.log("Delete Clicked");
                            setDeleteId(todo.id)}}/>
                        
                        </div>
                    </div>
                )
            }
        </li>

    )
}

