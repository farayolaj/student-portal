import { createQuery } from "react-query-kit";
import getApi from "../api";
import { toSession } from "../../transformers/dashboard";
import filterUnique from "@/utils/filter-unique";

export const useAllSessions = createQuery("all-sessions", async () => {
  const response = await getApi().get("/allsessions");

  if (!response.data.status) throw new Error("Could not fetch sessions");

  const sessions = (response.data.payload?.map(toSession) || []) as Session[];
  return filterUnique(sessions, (session) => session.id);
});
