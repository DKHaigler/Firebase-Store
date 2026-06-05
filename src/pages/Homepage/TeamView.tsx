import { useState, useEffect } from "react"
import { Member } from "../../types/Member";
import { getMembersByTeam } from "../../services/membersService";
import { useTeam } from "../../context/TeamContext";

export const TeamView = () => {
    const [ members, setMembers] = useState<Member[]>([]);
    const [ loadingMembers, setLoadingMembers] = useState(false);
    const { activeTeamId } = useTeam()
    const [empty, setEmpty] = useState()

    useEffect(() => {
    if (!activeTeamId) return;

        const fetchMembers = async () => {
        setLoadingMembers(true);

        const data = await getMembersByTeam(activeTeamId);

        setMembers(data);

        setLoadingMembers(false);
        };

        fetchMembers();
    }, [activeTeamId]);

    return (
        <div className="team-view">
            <div className="members__container">
                <h2>Members</h2>
                     {loadingMembers && <p>Loading...</p>}

                  {members.map((member) => (
                    <div className="member-card" key={member.userId}>
                      <p>{member.userId}</p>
                      <p>{member.role}</p>
                    </div>
                  ))}
            </div>
            <div className="urgent">
                <h2>Needs Attention</h2>
                <div className="urgent-container">

                </div>
            </div>
        </div>
    )
}