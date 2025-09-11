import { queryOptions } from "@tanstack/react-query";
import getApi from "./api";

async function getTourSettings() {
  const response = await getApi("/v1/api").get("/tour/settings");

  if (!response.data.status) throw new Error(response.data.message);

  return {
    courseId: response.data.payload.course_id as string | null,
    sessionId: response.data.payload.session_id as string | null,
  };
}

export const tourQueries = {
  all: () => ["tour"] as const,
  tourSettings: () =>
    queryOptions({
      queryKey: [...tourQueries.all(), "settings"] as const,
      queryFn: () => getTourSettings(),
      staleTime: 1000 * 60 * 10, // 10 minutes
    }),
};
