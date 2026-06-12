import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useInvites } from "../../features/invites/hooks/useInvites";
import { acceptInvite } from "../../features/invites/services/acceptInvite";
import { emitTeamUpdate } from "../../Components/Utils/events";
import "./InboxPage.css";

const InboxPage = () => {
  const { user } = useAuth();

  if (!user?.email) return <p>Loading...</p>;


  const { invites: initialInvites, loading } = useInvites(user.email);
  const [ invites, setInvites ] = useState(initialInvites);

  useEffect(() => {
  setInvites(initialInvites);
}, [initialInvites]);

  const handleAccept = async (inviteId: string) => {
    if (!user?.uid) return;

    // 🔥 optimistic update (instant UI)
    setInvites((prev) => prev.filter((i) => i.id !== inviteId));

    try {
      await acceptInvite(inviteId, user.uid);
      emitTeamUpdate();
    } catch (err) {
      console.error(err);

      // 🔄 rollback if something fails
      setInvites(initialInvites);
    }
  };

  if (loading) return <p>Loading invites...</p>;

  if (!invites?.length) {
    return <p>No pending invites 🎉</p>;
  }

  return (
    <div className="inbox">
      <h2>Inbox</h2>

      <div className="invite-list">
        {invites.map((invite) => (
          <div key={invite.id} className="invite-card">
            <p>
              <strong>Team:</strong> {invite.teamId}
            </p>

            <p>
              <strong>Role:</strong> {invite.role}
            </p>

            <button
              onClick={() => invite.id ? handleAccept(invite.id) : null}>
              Accept Invite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxPage;