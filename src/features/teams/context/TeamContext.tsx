import { createContext, useContext, useState, type ReactNode } from "react";
import { useAuth } from "../../auth/context/AuthContext";
import { useEffect } from "react";

type TeamContextType = {
  activeTeamId: string | null;
  setActiveTeamId: (id: string | null) => void;
};

// 1. CREATE CONTEXT
const TeamContext = createContext<TeamContextType | undefined>(undefined);

// 2. PROVIDER
export const TeamProvider = ({ children }: { children: ReactNode }) => {
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      const defaultTeamId = `personal_${user.uid}`;
      setActiveTeamId(defaultTeamId);
    } else {
      setActiveTeamId(null);
    }
  }, [user]);

  return (
    <TeamContext.Provider value={{ activeTeamId, setActiveTeamId }}>
      {children}
    </TeamContext.Provider>
  );
};

// 3. CUSTOM HOOK
export const useTeam = () => {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error("useTeam must be used within TeamProvider");
  }

  return context;
};
