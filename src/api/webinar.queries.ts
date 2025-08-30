import {
  toWebinar,
  toWebinarComment,
  toWebinarWithRecordings,
} from "@/transformers/webinars";
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

async function getComments(
  webinarId: string,
  pagination = {
    page: 1,
    perPage: 10,
  }
) {
  const response = await getApi("/v1/api").get(
    `/webinars/${webinarId}/comments`,
    {
      params: {
        page: pagination.page,
        perPage: pagination.perPage,
      },
    }
  );

  if (!response.data.status || !response.data.payload)
    throw new Error(response.data.message || "Error fetching comments");

  return {
    paging: response.data.payload.paging,
    comments: response.data.payload.data.map(toWebinarComment),
  } as WebinarCommentList;
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
  comments: () => [...webinarQueries.all(), "comments"] as const,
  commentsBy: (
    webinarId: string,
    pagination: { page: number; perPage: number }
  ) =>
    queryOptions({
      queryKey: [...webinarQueries.comments(), webinarId, pagination] as const,
      queryFn: () => getComments(webinarId, pagination),
      staleTime: 0,
    }),
};
