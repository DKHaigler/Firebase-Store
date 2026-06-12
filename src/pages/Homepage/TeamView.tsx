import { useTeam } from "../../context/TeamContext";

import { useTasks } from "../../features/tasks/hooks/useTasks";
import { useEnrichedTasks } from "../../features/tasks/hooks/useEnrichedTasks";
import { useTeamMembers } from "../../features/members/hooks/useTeamMembers";

import { OverdueTasksPanel } from "../../Components/Layout/OverduePanel/OverduePanel";
import { MembersPanel } from "../../Components/Layout/MembersPanel/MembersPanel";


export const TeamView = () => {
    const { tasks } = useTasks();
    const { activeTeamId } = useTeam();
    

    const members = useTeamMembers(activeTeamId);
    const enrichedTasks = useEnrichedTasks(tasks, members);

    return (
        <div className="team-view">    
            <MembersPanel members={members} loadingMembers={false} />
            <OverdueTasksPanel tasks={enrichedTasks} />
        </div>
    );
};