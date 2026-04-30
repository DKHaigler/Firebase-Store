import { useEffect, useState } from "react";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import { Task } from "../types/Task";


import {
  subscribeToTasks,
} from "../services/taskServices";

export const useTasks = (activeTeamId: string | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

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
              folderId: data.folderId,
              status: data.status,
              createdBy: data.createdBy
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