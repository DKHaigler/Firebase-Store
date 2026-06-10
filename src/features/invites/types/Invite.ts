export type Invite = {
  id?: string;
  teamId: string;
  email: string;
  role: "member" | "owner";
  status: "pending" | "accepted";
  createdBy: string;
  createdAt: any; // Firestore timestamp
};