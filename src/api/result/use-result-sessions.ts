import { toResultSession } from "@/transformers/results";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useResultSessions = createQuery(
  "session-result-stats",
  async () => {
    const response = await getApi().get("/examresult");

    if (!response.data.status) throw new Error(response.data.message);

    return response.data.payload.map(toResultSession) as ResultSession[];
  }
);
