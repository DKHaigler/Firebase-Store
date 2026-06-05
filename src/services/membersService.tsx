import {  addDoc,  collection,  getDocs,  query,  where,} from "firebase/firestore";

import { db } from "../lib/firebase";
import { Member } from "../types/Member";

export const createMember = async (
  userId: string,
  teamId: string,
  role: "owner" | "member"
) => {
  return await addDoc(collection(db, "members"), {
    userId,
    teamId,
    role,
  });
};

export const getMembersByTeam = async (
  teamId: string
): Promise<Member[]> => {
  const q = query(
    collection(db, "members"),
    where("teamId", "==", teamId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(
    (doc) => doc.data() as Member
  );
  
};