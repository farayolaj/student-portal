import { toSessionResultSummary } from "@/transformers/results";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useAllResults = createQuery("all-results", async () => {
  const response = await getApi().get("/allcourseresult");

  if (!response.data.status) throw new Error(response.data.message);

  return (response.data.payload || []).map(
    toSessionResultSummary
  ) as SessionResultSummary[];
});
