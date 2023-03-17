import { useAllSessions } from "../course/use-all-sessions";

export default function useLatestSession() {
  const allSessionsRef = useAllSessions();
  let currSession = allSessionsRef.data?.at(0);

  if (currSession)
    for (const session of allSessionsRef.data ?? []) {
      if (parseInt(session.id) > parseInt(currSession.id)) {
        currSession = session;
      }
    }

  return currSession;
}
