import useAuth from "@/hooks/use-auth";
import { useAllSessions } from "./use-all-sessions";

type Period = {
  session: { id: string; name: string };
  semester: { id: number; name: "First" | "Second" };
};

/**
 * Provides the current session id and semester.
 */
export function useCurrentPeriod() {
  const allSessionsRes = useAllSessions();
  const auth = useAuth();

  return {
    period: {
      semester: {
        id: auth.user?.currentSemester,
        name: auth.user?.currentSemester === 2 ? "Second" : "First",
      },
      session: {
        id: auth.user?.currentSessionId,
        name: allSessionsRes.data?.find(
          (session) => session.id === auth.user?.currentSessionId
        )?.name,
      },
    } as Period,
    isLoading: auth.isLoggingIn,
    error: auth.error,
  };
}
