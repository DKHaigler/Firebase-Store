import {collection, addDoc, query, where, onSnapshot, QuerySnapshot, DocumentData} from "firebase/firestore";
import { db } from "../lib/firebase";


export const subscribeToFolders = (teamId: string,
  callback: (snapshot: QuerySnapshot<DocumentData>) => void,
  onError: (err:unknown) => void) => {
  const q = query(
    collection(db, "folders"),
    where("teamId", "==", teamId)
  );

  return onSnapshot(q, callback, onError);
};

export const addFolder = async (teamId: string, name: string, createdBy: string) => {
  return await addDoc(collection(db, "folders"), {
    name,
    teamId,
    createdBy
  });
};