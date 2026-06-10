import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { Invite } from "../types/Invite";

export const getInvitesByEmail = async (email: string) => {
  const q = query(
    collection(db, "invites"),
    where("email", "==", email),
    where("status", "==", "pending")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Invite[];
};