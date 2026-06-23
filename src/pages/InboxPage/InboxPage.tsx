import { useAuth } from "../../features/auth/context/AuthContext";
import { useInvites } from "../../features/invites/hooks/useInvites";
import { acceptInvite } from "../../features/invites/services/acceptInvite";
import { emitTeamUpdate } from "../../Components/Utils/events";
import "./InboxPage.css";

const InboxPage = () => {
  const { user } = useAuth();

  if (!user?.email) return <p>Loading...</p>;

  const { invites , loading } = useInvites(user?.uid ?? null);


  const handleAccept = async (inviteId: string) => {
    if (!user?.uid) return;

    try {
      await acceptInvite(inviteId, user.uid);
      emitTeamUpdate();
    } catch (err) {
      console.error(err);

    }
  };

  if (loading) return <p className="inbox-message">Loading invites...</p>;

  if (!invites?.length) {
    return <p className="inbox-message">No pending invites 🎉</p>;
  }

  return (
    <div className="inbox">
      <h2>Inbox</h2>

      <div className="invite-list">
        {invites.map(({id, teamId, role}) => (
          <div key={id} className="invite-card">
            <p>
              <strong>Team:</strong> {teamId}
            </p>
            <p>
              <strong>Role:</strong> {role}
            </p>
            <button onClick={() => id ? handleAccept(id) : null}>
              Accept Invite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxPage;