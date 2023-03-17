import { toResult } from "@/transformers/results";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useResult = createQuery<
  Result,
  { session: ResultSession; semester?: number }
>("result", async ({ queryKey: [_, { session, semester }] }) => {
  let urlPath = `/courseresults?session=${encodeURIComponent(session.id)}`;

  if (semester) urlPath += `&semester=${encodeURIComponent(semester)}`;

  const response = await getApi().get(urlPath);

  if (!response.data.status) throw new Error(response.data.message);

  return toResult(session, response.data.payload);
});
