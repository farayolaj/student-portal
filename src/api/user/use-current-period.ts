import { useAllSessions } from "./use-all-sessions";
import { useProfile } from "./use-profile";

type Period = {
  session: { id: string; name: string };
  semester: { id: number; name: "First" | "Second" };
};

/**
 * Provides the current session id and semester.
 */
export function useCurrentPeriod() {
  const allSessionsRes = useAllSessions();
  const profile = useProfile();

  return {
    period: {
      semester: {
        id: profile.data?.user?.currentSemester,
        name: profile.data?.user?.currentSemester === 2 ? "Second" : "First",
      },
      session: {
        id: profile.data?.user?.currentSessionId,
        name: allSessionsRes.data?.find(
          (session) => session.id === profile.data?.user?.currentSessionId
        )?.name,
      },
    } as Period,
    isLoading: profile.isLoading,
    error: profile.error,
  };
}
