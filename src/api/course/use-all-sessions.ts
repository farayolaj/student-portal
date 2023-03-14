import { createQuery } from "react-query-kit";
import getApi from "../api";
import { toSession } from "../../transformers/dashboard";

export const useAllSessions = createQuery("all-sessions", async () => {
  const response = await getApi().get("/allsessions");

  if (!response.data.status) throw new Error("Could not fetch sessions");

  return (response.data.payload?.map(toSession) || []) as Session[];
});
