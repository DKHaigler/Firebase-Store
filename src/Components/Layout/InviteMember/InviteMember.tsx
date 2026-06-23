import { useState } from "react";
import { createInvite } from "../../../features/invites/services/createInvite"; 
import { useTeam } from "../../../features//teams/context/TeamContext"; 
import './InviteMember.css'

type Props = {
  userId: string;
};

export const InviteMember = ({ userId }: Props) => {
  const { activeTeamId } = useTeam();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"member" | "owner">("member");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleInvite = async () => {
  if (!activeTeamId || !email.trim()) return;

  setLoading(true);
  setMessage(null);
  setError(null);

  try {
    await createInvite(activeTeamId, email, role, userId);

    setMessage("Invite sent successfully 🎉");
    setEmail("");
    setRole("member");
  } catch (err: any) {
    setError(err.message || "Failed to send invite");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="invite-box">
      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
      <input
        placeholder="Invite by email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="invite-buttons">
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "member" | "owner")}
          >
          <option value="member">Member</option>
          <option value="owner">Owner</option>
        </select>
    
        <button onClick={handleInvite} disabled={loading || !email.trim()}>
          {loading ? "Sending..." : "Send Invite"}
        </button>
        </div>
    </div>
  );
};