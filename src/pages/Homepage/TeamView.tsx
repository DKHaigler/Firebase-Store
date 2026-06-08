import { useState, useEffect } from "react"
import { Member } from "../../types/Members";
import { getMembersByTeam } from "../../services/membersService";
import { useTeam } from "../../context/TeamContext";
import { isTaskOverdue } from "../../Components/Utils/TaskRules";
import { useTasks } from "../../features/tasks/hooks/useTasks";

export const TeamView = () => {
    const { tasks } = useTasks()
    const [ members, setMembers] = useState<Member[]>([]);
    const [ loadingMembers, setLoadingMembers] = useState(false);
    const { activeTeamId } = useTeam()
    const [empty, setEmpty] = useState()
    
    const overdueTasks = tasks.filter((task) => isTaskOverdue(task)); 

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
                <h3>Members</h3>
                <div className="members-cards">
                    
                     {loadingMembers && <p>Loading...</p>}

                  {members.map((member) => (
                      <div className="members-card" key={member.userId}>
                      <p>{member.userId}</p>
                      <p>{member.role}</p>
                    </div>
                  ))}
                </div>
            </div>
            <div className="overdue__container">
                  <h3>Overdue Tasks</h3>
                  <div className="overdue-tasks">

                    {overdueTasks.length === 0 ? (
                        <p>No overdue tasks 🎉</p>
                      ) : (
                          <ul>
                        {overdueTasks.map((task) => (
                            <li key={task.id}>
                            {task.text}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
            </div>
        </div>
    )
}