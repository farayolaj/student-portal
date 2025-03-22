import { useQuery } from "@tanstack/react-query";
import { userQueries } from "../user.queries";

export function useSession(sessionId: string) {
  return useQuery({
    ...userQueries.sessions(),
    select: (sessions) => sessions.find((s) => s.id === sessionId),
  });
}
