import { useAuth } from "../../context/AuthContext";
import { useInvites } from "../../features/invites/hooks/useInvites";
import { acceptInvite } from "../../features/invites/services/acceptInvite";
import "./InboxPage.css";

const InboxPage = () => {
  const { user } = useAuth();

  if (!user?.email) return <p>Loading...</p>;


  const { invites, loading } = useInvites(user.email);

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
              onClick={() =>
                invite.id
                  ? acceptInvite(invite.id, user.uid)
                  : null
              }
            >
              Accept Invite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InboxPage;