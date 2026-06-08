import { CustomButton } from "../../../Components/UI/Button/Button";

type TasksFilterProps = {  filter: "all" | "todo" | "in-progress" | "done";  setFilter: React.Dispatch<    React.SetStateAction<"all" | "todo" | "in-progress" | "done">  >;};

export const TasksFilter: React.FC<TasksFilterProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <div className="filters">
      <CustomButton
        label="All"
        hoverColor="white"
        onClick={() => setFilter("all")}
        active={filter === "all"}
      />

      <CustomButton
        label="Todo"
        hoverColor="red"
        onClick={() => setFilter("todo")}
        active={filter === "todo"}
      />

      <CustomButton
        label="In-Progress"
        hoverColor="yellow"
        onClick={() => setFilter("in-progress")}
        active={filter === "in-progress"}
      />

      <CustomButton
        label="Done"
        hoverColor="green"
        onClick={() => setFilter("done")}
        active={filter === "done"}
      />
    </div>
  );
};