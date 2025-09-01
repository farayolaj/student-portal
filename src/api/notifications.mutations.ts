import getApi from "./api";

export async function markNotificationsRead({ ids }: { ids: string[] }) {
  const response = await getApi("/v1/api").post("/notifications/read", { ids });

  if (!response.data.status) {
    throw new Error(response.data.message);
  }

  return;
}
