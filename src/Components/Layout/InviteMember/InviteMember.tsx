import { useState } from "react";
import { createInvite } from "../../../features/invites/services/createInvite"; 
import { useTeam } from "../../../context/TeamContext"; 

type Props = {
  userId: string;
};

export const InviteMember = ({ userId }: Props) => {
  const { activeTeamId } = useTeam();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"member" | "owner">("member");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    if (!activeTeamId || !email.trim()) return;

    setLoading(true);

    await createInvite(activeTeamId, email, role, userId);

    setEmail("");
    setRole("member");

    setLoading(false);
  };

  return (
    <div className="invite-box">
      <input
        placeholder="Invite by email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "member" | "owner")}
      >
        <option value="member">Member</option>
        <option value="owner">Owner</option>
      </select>

      <button onClick={handleInvite} disabled={loading}>
        {loading ? "Sending..." : "Send Invite"}
      </button>
    </div>
  );
};