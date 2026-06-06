import { getDoc, doc, setDoc, QuerySnapshot, DocumentData, query, collection, where, onSnapshot, addDoc, getDocs} from "firebase/firestore";
import { db } from "../lib/firebase";
import { User } from "firebase/auth";
import { createMember } from "./membersService";

export const subscribeToTeams = (
  userId: string,
  callback: (snapshot: QuerySnapshot<DocumentData>) => void,
  onError: (err: unknown) => void
) => {
  const q = query(
    collection(db, "teams"),
    where("ownerId", "==", userId)
  );

  return onSnapshot(q, callback, onError);
};

export const createTeam = async (
  name: string,
  ownerId: string
) => {
  const teamRef = await addDoc(collection(db, "teams"), {
    name,
    ownerId,
  });
  
  await createMember(
    ownerId,
    teamRef.id,
    "owner"
  )
  return teamRef
};



export const ensureUserHasPersonalTeam = async (user: User) => {
  const teamId = `personal_${user.uid}`;

  const teamRef = doc(db, "teams", teamId);
  const existing = await getDoc(teamRef);

  if (!existing.exists()) {
    await setDoc(teamRef, {
      name: "Personal",
      ownerId: user.uid,
    });
  }
};