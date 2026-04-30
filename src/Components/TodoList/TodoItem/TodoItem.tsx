import { CustomButton } from "../../Button/Button"
import { Task } from "../../../types/Task"; 

type TodoItemProps = {
  task: Task;
  editId: string | null;
  editText: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  saveEdit: (id: string) => void;
  taskComplete: (id: string) => void;
  startEdit: (id: string, text: string) => void;
  deleteTodo: (id: string) => void;
  setDeleteId: (id:string) => void;
};

export const TodoItem = ({ task, editId, editText, setEditText, saveEdit, taskComplete, startEdit, setDeleteId, }: TodoItemProps) => {
    return(
        <li className='todo-outer__container'>
            {
                editId === task.id ? (
                    <div className="save-todo">
                    <input 
                        type="text"
                        value={editText}
                        onChange={(event) => setEditText(event.target.value)}
                    />
                     <CustomButton 
                        label="Save" 
                        hoverColor="green" 
                        onClick={() => saveEdit(task.id)}/>
                    </div>
                ) : (
                    <div className='todo-inner__container'>
                    <input 
                        type="checkbox" 
                        checked={task.status === "done"} 
                        onChange={() => taskComplete(task.id)} />
                        <div className={
                            task.status === "done" ? "in-progress" : "todo-text"
                            }>
                        {task.text}
                        </div>
                        <div className='button__container'>
                        <CustomButton label="Edit" 
                        hoverColor="blue" 
                        onClick={() => startEdit(task.id, task.text)}/>
                        <CustomButton 
                        label="Delete" 
                        hoverColor="red" 
                        onClick={() => {

                            console.log("Delete Clicked");
                            setDeleteId(task.id)}}/>
                        
                        </div>
                    </div>
                )
            }
        </li>

    )
}

