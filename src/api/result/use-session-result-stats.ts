import { toSessionResultStats } from "@/transformers/results";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useSessionResultStats = createQuery<
  SessionResultStats,
  { sessionId: string }
>("session-result-stats", async ({ queryKey: [_, { sessionId }] }) => {
  const response = await getApi().get(
    `/examstats?session=${encodeURIComponent(sessionId)}`
  );

  if (!response.data.status) throw new Error(response.data.message);

  return toSessionResultStats(response.data.payload);
});
