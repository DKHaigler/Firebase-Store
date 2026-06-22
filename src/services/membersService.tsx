import {  addDoc,  collection,  getDocs,  query,  where,} from "firebase/firestore";

import { db } from "../lib/firebase";
import { Member } from "../features/members/type/Members";

export const createMember = async (
  userId: string,
  teamId: string,
  role: "owner" | "member",
  name: string
) => {
  return await addDoc(collection(db, "members"), {
    userId,
    teamId,
    role,
    name
  });
};

export const getMembersByTeam = async (teamId:string): Promise<Member[]> => {
  const q = query(
    collection(db, "members"),
    where("teamId", "==", teamId)
  );

  const snapshot = await getDocs(q);

  const members: Member[] = snapshot.docs.map((doc) => ({
    ...(doc.data() as Member),
  }));

  return members;
};

export const getMembersByUser = async (userId: string) => {
  const q = query(
    collection(db, "members"),
    where("userId", "==", userId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as Member),
  }));
};