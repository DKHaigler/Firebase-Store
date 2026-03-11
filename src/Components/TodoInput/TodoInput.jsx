import { CustomButton } from "../Button/Button"

export const TodoInput = ({ newTodo, setNewTodo, addTodo }) => {
    return (
        <div>
            <input type="text" value={newTodo} onChange={(event) => setNewTodo(event.target.value)}/>
            <CustomButton label="Add Todo" hoverColor="green" onClick={addTodo} />
        </div>
    )
}