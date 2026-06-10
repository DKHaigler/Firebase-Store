import { useMemo } from "react";
import { Member } from "../../../types/Members";

export const useMemberLookup = (members: Member[]) => {
  const memberMap = useMemo(() => {
    return members.reduce((acc, member) => {
      acc[member.userId] = member;
      return acc;
    }, {} as Record<string, Member>);
  }, [members]);

  const getMemberName = (userId: string) => {
    return memberMap[userId]?.name ?? "Unassigned";
  };

  return {
    memberMap,
    getMemberName,
  };
};