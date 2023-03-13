import { useAllSessions } from "../course/use-all-sessions";
import { useUser } from "./use-user";

export default function useCurrentSession() {
  const userRes = useUser();
  const allSessionsRef = useAllSessions();

  return allSessionsRef.data?.find((s) => s.id === userRes.data?.sessionId);
}
