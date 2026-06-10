import { EnrichedTask } from "../../../features/tasks/hooks/useEnrichedTasks";
import './OverduePanel.css'

type OverdueTasksPanelProps = {
  tasks: EnrichedTask[];
};

export const OverdueTasksPanel = ({
  tasks,
}: OverdueTasksPanelProps) => {
  const today = new Date();

  const overdueTasks = tasks.filter((task) => {
    if (!task.dueDate || task.status === "done") return false;

    const dueDate = new Date(task.dueDate);

    return dueDate < today;
  });

  return (
    <div className="overdue__container">
      <h3 className="overdue__title">
        ⚠️ Overdue Tasks ({overdueTasks.length})
      </h3>

      {overdueTasks.length === 0 ? (
        <p className="overdue__empty">No overdue tasks 🎉</p>
      ) : (
        <div className="overdue__list">
          {overdueTasks.map((task) => (
            <div key={task.id} className="overdue__card">
              
              <div className="overdue__top">
                <span className="overdue__task">
                  {task.text}
                </span>
              </div>

              <div className="overdue__meta">
                <span>
                  Assigned: {(task.assignedToName)}
                </span>

                <span>
                  Due: {task.dueDate}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};