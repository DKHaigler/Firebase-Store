import { useTeam } from "../../../features/teams/context/TeamContext";
import { useState} from "react";
import { useTeams } from "../../../features/teams/hooks/useTeams";
import { User } from "firebase/auth";
import { createTeam } from "../../../features/teams/service/teamServices";
import "./TeamSwitcher.css"
type TeamSwitcherProps = {
    user: User | null;
}

export const TeamSwitcher = ({ user }: TeamSwitcherProps) => {
    const { activeTeamId, setActiveTeamId } = useTeam();
    const [open, setOpen] = useState(false);
    const { teams } = useTeams(user?.uid ?? null);
    const [ newTeamName, setNewTeamName ] = useState("")
  
    const activeTeam = teams.find(t => t.id === activeTeamId) ?? teams[0] ?? null;

  const handleCreateTeam = async () => {
  if (!user?.uid || !newTeamName.trim()) return;

  try {
    const newTeamRef = await createTeam(newTeamName, user.uid);

    if (!newTeamRef?.id) return;

    setNewTeamName("");
    setActiveTeamId(newTeamRef.id);
    setOpen(false);
  } catch (err) {
    console.error(err);
  }
  
};

  return (
    <div className="team-switcher">
      <button onClick={() => setOpen(prev => !prev)}>
        {activeTeam?.name || "Select Team"} ⌄
      </button>

      {open && (
        <div className="dropdown">
          {teams.map(team => (
            <div
              key={team.id}
              onClick={() => {
                if (!team?.id) return;
                setActiveTeamId(team.id);
                setOpen(false);
              }}
              className={`dropdown-item ${
                team.id === activeTeamId ? "active" : ""
              }`}
            >
              {team.name}
            </div>
          ))}
          <div className="dropdown-divider" />
            <input
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder="New team name"
            />
            <button onClick={handleCreateTeam}>
              Create Team
            </button>
        </div>
      )}
    </div>
  );
};