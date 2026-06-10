import { useState } from "react"

import { useTeam } from "../../context/TeamContext";
import { useAuth } from "../../context/AuthContext";

import { useTasks } from "../../features/tasks/hooks/useTasks";
import { useEnrichedTasks } from "../../features/tasks/hooks/useEnrichedTasks";
import { useTeamMembers } from "../../features/members/hooks/useTeamMembers";

import { OverdueTasksPanel } from "../../Components/Layout/OverduePanel/OverduePanel";
import { MembersPanel } from "../../Components/Layout/MembersPanel/MembersPanel";
import { InviteMember } from "../../Components/Layout/InviteMember/InviteMember";

export const TeamView = () => {
    const { tasks } = useTasks();
    const { activeTeamId } = useTeam();
    const { user } = useAuth();

    const members = useTeamMembers(activeTeamId);
    const enrichedTasks = useEnrichedTasks(tasks, members);

    return (
        <div className="team-view">

            <div className="team-actions">
                <InviteMember userId={user!.uid} />
            </div>
            
            <MembersPanel members={members} loadingMembers={false} />
            <OverdueTasksPanel tasks={enrichedTasks} />
        </div>
    );
};