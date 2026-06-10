import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { serverTimestamp } from "firebase/firestore";
import { createMember } from "../../../services/membersService";
import { Invite } from "../types/Invite";

export const acceptInvite = async (
  inviteId: string,
  userId: string
) => {
  const inviteRef = doc(db, "invites", inviteId);
  const inviteSnap = await getDoc(inviteRef);

  if (!inviteSnap.exists()) {
    throw new Error("Invite not found");
  }

  const invite = inviteSnap.data() as Invite;

  if (invite.status !== "pending") {
    throw new Error("Invite already used");
  }

  // get user profile for name
  const userSnap = await getDoc(doc(db, "users", userId));

  if (!userSnap.exists()) {
    throw new Error("User profile missing");
  }

  const userData = userSnap.data() as { name: string };

  if (!userData.name) {
    throw new Error("User name missing");
  }

  await createMember(
    userId,
    invite.teamId,
    invite.role,
    userData.name
  );

  await updateDoc(inviteRef, {
    status: "accepted",
    acceptedAt: serverTimestamp(),
  });
};