import { useEffect, useState } from "react";
import { Member } from "../type/Members";
import { getMembersByTeam } from "../service/membersService";

export const useTeamMembers = (teamId: string | null) => {
  const [members, setMembers] = useState<Member[]>([]);

  const fetchMembers = async () => {
    if (!teamId) return;

    try {
      const data = await getMembersByTeam(teamId);
      setMembers(data);
    } catch (err) {
      console.error("Failed to load members:", err);
    }
  };

  // initial load + when team changes
  useEffect(() => {
    fetchMembers();
  }, [teamId]);

  // listen for global updates
  useEffect(() => {
    const handleUpdate = () => {
      fetchMembers();
    };

    window.addEventListener("team-updated", handleUpdate);

    return () => {
      window.removeEventListener("team-updated", handleUpdate);
    };
  }, [teamId]);

  return members;
};