import { useEffect, useState } from "react";
import { subscribeToProjects } from "../service/projectService";
import { Project } from "../type/Project";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import { useTeam } from "../../teams/context/TeamContext";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const {activeTeamId} = useTeam()

  useEffect(() => {
    if (!activeTeamId) {
      setProjects([]);
      return;
    }

    const unsubscribe = subscribeToProjects(
      activeTeamId,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const mapped: Project[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                teamId: data.teamId,
                createdBy: data.createdBy

            }
          });
          setProjects(mapped)
      },
      (err: unknown) => 
        console.error(err)
    );

    return () => unsubscribe();
  }, [activeTeamId]);

  return { projects };
};