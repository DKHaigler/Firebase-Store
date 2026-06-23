import { useState, useEffect } from "react";
import { Team } from "../type/Team";

import { subscribeToTeams } from "../service/teamServices";


export const useTeams = (userId: string | null) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setTeams([]);
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToTeams(
      userId,
      (snapshot) => {
        const mapped: Team[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            ownerId: data.ownerId,
          };
        });

        setTeams(mapped);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { teams, loading };
};