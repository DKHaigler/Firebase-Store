import { useState, useEffect } from "react"
import { Member } from "../../types/Members";
import { getMembersByTeam } from "../../services/membersService";
import { useTeam } from "../../context/TeamContext";
import { isTaskOverdue } from "../../Components/Utils/TaskRules";
import { useTasks } from "../../features/tasks/hooks/useTasks";
import { OverdueTasksPanel } from "../../Components/Layout/OverduePanel/OverDuePanel";
import { MembersPanel } from "../../Components/Layout/MembersPanel/MembersPanel";

export const TeamView = () => {
    const { tasks } = useTasks()
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
            <MembersPanel members={members} loadingMembers={loadingMembers} />
            <OverdueTasksPanel tasks={tasks} />
        </div>
    )
}