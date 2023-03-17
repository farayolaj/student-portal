import { useAllSessions } from "../course/use-all-sessions";
import { useUser } from "./use-user";

type Period = {
  session: { id: string; name: string };
  semester: { id: number; name: "First" | "Second" };
};

type UseCurrentPeriodOpts = {
  onSuccess?: (data: Period) => void;
  onError?: (err: unknown) => void;
};

/**
 * Provides the current session id and semester.
 */
export function useCurrentPeriod(opts?: UseCurrentPeriodOpts) {
  const allSessionsRes = useAllSessions();
  const periodRes = useUser({
    select: (data) =>
      ({
        semester: {
          id: data.currentSemester,
          name: data.currentSemester === 1 ? "First" : "Second",
        },
        session: {
          id: data.currentSessionId,
          name: allSessionsRes.data?.find(
            (session) => session.id === data.currentSessionId
          )?.name,
        },
      } as Period),
    onSuccess: opts?.onSuccess,
    onError: opts?.onError,
    enabled: !!allSessionsRes.data,
  });

  return {
    period: periodRes.data,
    isLoading: periodRes.isLoading,
    isError: periodRes.isError,
    error: periodRes.error,
  };
}
