import { CustomButton } from "../../../../Components/UI/Button/Button"
import { useState } from "react";

type TodoInputProps = {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  dueDate: string
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => Promise<void>;
};



export const TodoInput = ({ newTodo, setNewTodo, dueDate, setDueDate, addTodo }: TodoInputProps) => {
    return (
        <div className="add-todo">
            <input 
            type="text" 
            value={newTodo} 
            onChange={(event) => setNewTodo(event.target.value)}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    addTodo();
                }
            }}
            />
            <input type="date"
             value={dueDate}
             onChange={(e) => setDueDate(e.target.value)}
             />
            <CustomButton label="Add Task" hoverColor="green" onClick={addTodo} />
        </div>
    )
}
