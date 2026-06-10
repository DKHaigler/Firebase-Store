import { useMemo } from "react";
import { Task } from "../types/Task";
import { Member } from "../../members/type/Members";

export type EnrichedTask = Task & {
  assignedToName: string;
};

export const useEnrichedTasks = (
  tasks: Task[],
  members: Member[]
): EnrichedTask[] => {
  return useMemo(() => {
    const memberMap = members.reduce((acc, m) => {
      acc[m.userId] = m;
      return acc;
    }, {} as Record<string, Member>);

    return tasks.map((task) => ({
      ...task,
      assignedToName:
        memberMap[task.assignedTo]?.name ?? "Unassigned",
    }));
  }, [tasks, members]);
};