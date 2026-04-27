import { useEffect, useState } from "react";
import { subscribeToFolders, addFolder } from "../services/folderService";
import { Folder } from "../types/Folder";

export const useFolders = (activeTeamId: string | null) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    if (!activeTeamId) {
      setFolders([]);
      return;
    }

    const unsubscribe = subscribeToFolders(
      activeTeamId,
      (snapshot: any) => {
        setFolders(
          snapshot.docs.map((doc: any) => ({
            ...doc.data(),
            id: doc.id
          }))
        );
      },
      (err: any) => console.error(err)
    );

    return () => unsubscribe();
  }, [activeTeamId]);

  return { folders, addFolder };
};