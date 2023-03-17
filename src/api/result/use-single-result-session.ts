import { useResultSessions } from "./use-result-sessions";

export function useSingleResultSession(sessionId: string) {
  const { data: resultSessions = [] } = useResultSessions();
  const resultSession = resultSessions.find(
    (session) => session.id === sessionId
  );

  return resultSession;
}
