import { CustomButton } from "../../../../Components/UI/Button/Button";

import { useTeamMembers } from "../../../../features/members/hooks/useTeamMembers";
import { useTeam } from "../../../../context/TeamContext";

type TodoInputProps = {
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  dueDate: string;
  setDueDate: React.Dispatch<React.SetStateAction<string>>;

  addTodo: (
    text: string,
    selectedProject: string | null,
    dueDate: string,
    assignedTo: string
  ) => Promise<void>;

  selectedProject: string | null;

  assignedTo: string;
  setAssignedTo: React.Dispatch<React.SetStateAction<string>>;

};

export const TodoInput = ({ newTodo, setNewTodo, dueDate, setDueDate, addTodo, selectedProject, assignedTo, setAssignedTo,
}: TodoInputProps) => {

  const handleAdd = async () => {
    await addTodo(newTodo, selectedProject, dueDate, assignedTo);

    setNewTodo("");
    setAssignedTo("");
  };
const { activeTeamId } = useTeam();
const members = useTeamMembers(activeTeamId);

  return (
    <div className="add-todo">

      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
      />

      <input
        type="date"
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
            {m.name}
          </option>
        ))}
      </select>

      <CustomButton
        label="Add Task"
        hoverColor="green"
        onClick={handleAdd}
      />

    </div>
  );
};