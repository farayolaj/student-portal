import { queryOptions } from "@tanstack/react-query";
import {
  toResult,
  toResultSession,
  toSessionResultSummary,
} from "../transformers/results";
import getApi from "./api";

async function getResultSummaries() {
  const response = await getApi().get("/allcourseresult");

  if (!response.data.status) throw new Error(response.data.message);

  return (response.data.payload || []).map(
    toSessionResultSummary
  ) as SessionResultSummary[];
}

async function getResultSessions() {
  const response = await getApi().get("/examresult");

  if (!response.data.status) throw new Error(response.data.message);

  return response.data.payload.map(toResultSession) as ResultSession[];
}

async function getResult(session: ResultSession, semester?: number) {
  let urlPath = `/courseresults?session=${encodeURIComponent(session.id)}`;

  if (semester) urlPath += `&semester=${encodeURIComponent(semester)}`;

  const response = await getApi().get(urlPath);

  if (!response.data.status) throw new Error(response.data.message);

  return toResult(session, response.data.payload);
}

export const resultQueries = {
  all: () => ["results"],
  summaries: () =>
    queryOptions({
      queryKey: [...resultQueries.all(), "summaries"],
      queryFn: getResultSummaries,
    }),
  sessions: () =>
    queryOptions({
      queryKey: [...resultQueries.all(), "sessions"],
      queryFn: getResultSessions,
    }),
  details: () => [...resultQueries.all(), "details"],
  detailsBy: (session: ResultSession, semester?: number) =>
    queryOptions({
      queryKey: [...resultQueries.details(), session?.id, semester],
      queryFn: () => getResult(session, semester),
    }),
};
