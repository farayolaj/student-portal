import { useQuery } from "@tanstack/react-query";
import { userQueries } from "../user.queries";

type Period = {
  session: { id: string; name: string };
  semester: { id: number; name: "First" | "Second" };
};

/**
 * Provides the current school session id and semester.
 * This is distinct from the student's current session and semester
 * as a student may be on a different semester from the current one
 * due to being a graduate or taking a deferment.
 */
export function useSchoolPeriod() {
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
