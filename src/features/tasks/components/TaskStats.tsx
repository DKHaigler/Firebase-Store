import { CustomButton } from "../../../Components/UI/Button/Button";
import { Task } from "../types/Task"; 

type TasksStatsProps = {  tasks: Task[];  clearCompleted: () => void;};

export const TasksStats: React.FC<TasksStatsProps> = ({  tasks,  clearCompleted,}) => {
  const activeCount = tasks.filter(    (task) => task.status !== "done"  ).length;

  const hasCompleted = tasks.some(    (task) => task.status === "done"  );

  return (
    <div className="tasks__container">
      <p>
        {activeCount} {activeCount === 1 ? "task" : "tasks"} remaining
      </p>

      {hasCompleted && (
        <CustomButton
          label="Clear Completed"
          hoverColor="Green"
          onClick={clearCompleted}
        />
      )}
    </div>
  );
};