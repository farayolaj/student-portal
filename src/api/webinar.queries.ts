import { toWebinar, toWebinarWithRecordings } from "@/transformers/webinars";
import { queryOptions } from "@tanstack/react-query";
import getApi from "./api";

async function listWebinars(sessionId: string, courseId: string) {
  const response = await getApi("/v1/api").get(
    `/courses/${sessionId}/${courseId}/webinars`
  );

  if (!response.data.status) throw new Error(response.data.message);

  return (response.data.payload?.map(toWebinar) || []) as Webinar[];
}

async function getWebinar(webinarId: string) {
  const response = await getApi("/v1/api").get(`/webinars/${webinarId}`);

  if (!response.data.status) throw new Error(response.data.message);

  return (
    response.data.payload
      ? toWebinarWithRecordings(response.data.payload)
      : null
  ) as WebinarWithRecordings | null;
}

export const webinarQueries = {
  all: () => ["webinar"] as const,
  list: () => [...webinarQueries.all(), "list"] as const,
  listBy: (sessionId: string, courseId: string) =>
    queryOptions({
      queryKey: [...webinarQueries.list(), sessionId, courseId] as const,
      queryFn: () => listWebinars(sessionId, courseId),
    }),
  details: () => [...webinarQueries.all(), "details"] as const,
  detailsBy: (id: string) =>
    queryOptions({
      queryKey: [...webinarQueries.details(), id] as const,
      queryFn: () => getWebinar(id),
    }),
};
