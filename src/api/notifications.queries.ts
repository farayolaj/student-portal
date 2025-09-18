import { toNotification } from "@/transformers/notifications";
import { queryOptions } from "@tanstack/react-query";
import getApi from "./api";

async function getNotifications(page = 1, perPage = 10) {
  const response = await getApi("/v1/api").get("/notifications", {
    params: { page, per_page: perPage },
  });

  if (!response.data.status) throw new Error(response.data.message);

  return {
    paging: {
      totalCount: response.data.payload?.paging?.total_count as number,
      page: response.data.payload?.paging?.page as number,
      perPage: response.data.payload?.paging?.per_page as number,
      totalPages: response.data.payload?.paging?.total_pages as number,
    },
    notifications: response.data.payload?.data?.map(
      toNotification
    ) as EventNotification[],
  };
}

async function getNotificationCount() {
  const response = await getApi("/v1/api").get("/notifications/count");

  if (!response.data.status) throw new Error(response.data.message);

  return response.data.payload;
}

export const notificationQueries = {
  all: () => ["notifications"],
  getPage: (page: number, perPage: number) =>
    queryOptions({
      queryKey: [...notificationQueries.all(), page, perPage],
      queryFn: () => getNotifications(page, perPage),
      staleTime: 1000 * 60 * 1, // 1 minute
    }),
  getCount: () =>
    queryOptions({
      queryKey: [...notificationQueries.all(), "count"],
      queryFn: getNotificationCount,
      refetchInterval: 1000 * 60 * 2.5, // Refetch every 2.5 minute
    }),
};
