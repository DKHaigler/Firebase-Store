import { useEffect, useState } from "react";
import { Invite } from "../types/Invite";
import { getInvitesByEmail } from "../services/getInvitesByEmail";

export const useInvites = (email: string ) => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }

    const loadInvites = async () => {
      setLoading(true);

      const data = await getInvitesByEmail(email);

      setInvites(data);
      setLoading(false);
    };

    loadInvites();
  }, [email]);

  return { invites, loading };
};