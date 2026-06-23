import { useEffect, useState } from "react";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import { Task } from "../types/Task";
import { useTeam } from "../../teams/context/TeamContext";


import {
  subscribeToTasks,
} from "../../tasks/service/taskServices";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const {activeTeamId} = useTeam();

  useEffect(() => {
    setTasks([]);
    setLoading(true);
    
    if (!activeTeamId) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToTasks(
      activeTeamId,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const mappedTasks: Task[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return{
              id: doc.id,
              text: data.text,
              teamId: data.teamId,
              projectId: data.projectId,
              status: data.status,
              createdBy: data.createdBy,
              assignedTo: data.assignedTo,
              dueDate: data.dueDate
            };
          });
        setTasks(mappedTasks)
        setLoading(false);
      },
      (err: unknown) => {
        console.error(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [activeTeamId]);

  return {
    tasks,
    loading,
  };
};