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
    return onSnapshot(q, async (snapshot) => {
      try {
        const memberships = snapshot.docs.map((d) => d.data() as any);

        const teamDocs = await Promise.all(
          memberships.map((m) =>
            getDoc(doc(db, "teams", m.teamId))
          )
        );
      
        const fakeSnapshot = {
          docs: teamDocs
            .filter((t) => t.exists())
            .map((t) => ({
              id: t.id,
              data: () => t.data(),
            })),
        } as unknown as QuerySnapshot<DocumentData>;

        callback(fakeSnapshot);
      } catch (err) {
        onError(err);
      }
    },
    onError
  );
};

export const createTeam = async (
  name: string,
  ownerId: string

) => {
  const teamRef = await addDoc(collection(db, "teams"), {
    name,
    ownerId,
  });

  const userSnap = await getDoc(doc(db, "users",ownerId));
  

    if (!userSnap.exists()) {
    throw new Error("User profile missing name. Cannot create team member.");
  }

  const userData = userSnap.data() as { name: string};
  
  await createMember(
    ownerId,
    teamRef.id,
    "owner",
    userData.name
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