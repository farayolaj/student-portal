import { createQuery } from "react-query-kit";
import api from "../api";
import { toSession } from "../../transformers/dashboard";

export const useAllSessions = createQuery("all-sessions", async () => {
  const response = await api.get("/allsessions");

  if (!response.data.status) throw new Error("Could not fetch sessions");

  return response.data.payload.map(toSession) as Session[];
});
