import { useQuery } from "@tanstack/react-query";
import { userQueries } from "../user.queries";

type Period = {
  session: { id: string; name: string };
  semester: { id: number; name: "First" | "Second" };
};

/**
 * Provides the current session id and semester.
 */
export function useCurrentPeriod() {
  const { data: allSessions } = useQuery(userQueries.sessions());
  const {
    data: profile,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery(userQueries.profile());

  return {
    period: {
      semester: {
        id: profile?.user?.currentSemester,
        name: profile?.user?.currentSemester === 2 ? "Second" : "First",
      },
      session: {
        id: profile?.user?.currentSessionId,
        name: allSessions?.find(
          (session) => session.id === profile?.user?.currentSessionId
        )?.name,
      },
    } as Period,
    isLoading: profileIsLoading,
    error: profileError,
  };
}
