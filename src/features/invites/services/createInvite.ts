import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";

export const createInvite = async (
  teamId: string,
  email: string,
  role: "member" | "owner",
  createdBy: string
) => {
  // 🔒 Validate user exists in your system
  const userQuery = query(
    collection(db, "users"),
    where("email", "==", email)
  );

  const snapshot = await getDocs(userQuery);

  if (snapshot.empty) {
    throw new Error("User does not exist in this system");
  }

  // 🔒 Optional: prevent duplicate invites
  const existingInviteQuery = query(
    collection(db, "invites"),
    where("email", "==", email),
    where("teamId", "==", teamId),
    where("status", "==", "pending")
  );

  const existing = await getDocs(existingInviteQuery);

  if (!existing.empty) {
    throw new Error("Invite already sent to this user");
  }

  const inviteRef = await addDoc(collection(db, "invites"), {
    teamId,
    email,
    role,
    status: "pending",
    createdBy,
    createdAt: serverTimestamp(),
  });

  return inviteRef.id;
};