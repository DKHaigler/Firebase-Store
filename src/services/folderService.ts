import {collection, addDoc, query, where, onSnapshot} from "firebase/firestore";
import { db } from "../lib/firebase";


export const subscribeToFolders = (uid: string, callback: any, onError: any) => {
  const q = query(
    collection(db, "folders"),
    where("uid", "==", uid)
  );

  return onSnapshot(q, callback, onError);
};

export const addFolder = async (uid: string, name: string) => {
  return await addDoc(collection(db, "folders"), {
    name,
    uid
  });
};