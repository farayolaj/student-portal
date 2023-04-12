import { useAllSessions } from "./use-all-sessions";

export function useSession(sessionId: string) {
  const sessionRes = useAllSessions({
    select: (sessions) => sessions.find((s) => s.id === sessionId),
  });

  return sessionRes;
}
