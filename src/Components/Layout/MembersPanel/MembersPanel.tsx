import { Member } from "../../../types/Members";
import './MembersPanel.css'

type MembersPanelProps = {
  members: Member[];
  loadingMembers: boolean;
};

export const MembersPanel = ({
  members,
  loadingMembers,
}: MembersPanelProps) => {
  return (
    <div className="members__container">
      <h3>Members</h3>

      <div className="members-cards">
        {loadingMembers && <p>Loading...</p>}

        {members.map((member) => (
          <div className="members-card" key={member.userId}>
            <p>{member.name}</p>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};