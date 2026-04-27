import {collection, addDoc, query, where, onSnapshot} from "firebase/firestore";
import { db } from "../lib/firebase";


export const subscribeToFolders = (teamId: string, callback: any, onError: any) => {
  const q = query(
    collection(db, "folders"),
    where("teamId", "==", teamId)
  );

  return onSnapshot(q, callback, onError);
};

export const addFolder = async (teamId: string, name: string) => {
  return await addDoc(collection(db, "folders"), {
    name,
    teamId
  });
};