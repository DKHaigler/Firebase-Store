import { useEffect, useState } from "react";
import { subscribeToFolders } from "../services/folderService";
import { Folder } from "../types/Folder";
import { QuerySnapshot, DocumentData } from "firebase/firestore";

export const useFolders = (activeTeamId: string | null) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    if (!activeTeamId) {
      setFolders([]);
      return;
    }

    const unsubscribe = subscribeToFolders(
      activeTeamId,
      (snapshot: QuerySnapshot<DocumentData>) => {
        const mapped: Folder[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                teamId: data.teamId,
                createdBy: data.createdBy

            }
          });
          setFolders(mapped)
      },
      (err: unknown) => 
        console.error(err)
    );

    return () => unsubscribe();
  }, [activeTeamId]);

  return { folders };
};