import { useEffect, useState } from "react";
import { Member } from "../type/Members";
import { getMembersByTeam } from "../../../services/membersService";

export const useTeamMembers = (teamId: string | null) => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    if (!teamId) return;

    const loadMembers = async () => {
      try {
        const data = await getMembersByTeam(teamId);
        setMembers(data);
      } catch (err) {
        console.error("Failed to load members:", err);
      }
    };

    loadMembers();
  }, [teamId]);

  return members;
};