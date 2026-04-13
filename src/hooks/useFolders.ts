import { useEffect, useState } from "react";
import { subscribeToFolders, addFolder } from "../services/folderService";
import { Folder } from "../types/Folder";

export const useFolders = (user: any) => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    if (!user) {
      setFolders([]);
      return;
    }

    const unsubscribe = subscribeToFolders(
      user.uid,
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
  }, [user]);

  return { folders, addFolder };
};