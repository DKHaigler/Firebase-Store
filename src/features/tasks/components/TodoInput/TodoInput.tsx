import { useState } from "react";
import { CustomButton } from "../../../../Components/UI/Button/Button"


type TodoInputProps = {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  dueDate: string
  setDueDate: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (
    text: string,
    selectedProject: string | null,
    dueDate: string,
    assignedTo: string
  ) => Promise<void>;
  selectedProject: string | null;
  members: any[];


  assignedTo: string;
  setAssignedTo: React.Dispatch<React.SetStateAction<string>>;
};



export const TodoInput = ({ newTodo, setNewTodo, dueDate, setDueDate, addTodo, selectedProject, members }: TodoInputProps) => {
    const [ assignedTo, setAssignedTo] = useState("")

    const handleAdd = async () => {
    await addTodo(newTodo, selectedProject, dueDate, assignedTo);
    setNewTodo("");
  };
    return (
        <div className="add-todo">
            <input 
            type="text" 
            value={newTodo} 
            onChange={(event) => setNewTodo(event.target.value)}
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    handleAdd();
                }
            }}
            />
            <input type="date"
             value={dueDate}
             onChange={(e) => setDueDate(e.target.value)}
             />
            <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
            >
            <option value="">Assign to</option>
                {members.map((m) => (
                  <option key={m.userId} value={m.userId}>
                    {m.userId}
                  </option>
                ))}
            </select>
            <CustomButton label="Add Task" hoverColor="green" onClick={handleAdd} />
        </div>
    )
}
