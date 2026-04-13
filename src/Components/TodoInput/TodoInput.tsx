import { CustomButton } from "../Button/Button"

type TodoInputProps = {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: () => void;
};

export const TodoInput = ({ newTodo, setNewTodo, addTodo }: TodoInputProps) => {
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
            <CustomButton label="Add Todo" hoverColor="green" onClick={addTodo} />
        </div>
    )
}
