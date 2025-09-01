import getApi from "./api";

export async function postComment(webinarId: string, content: string) {
  const response = await getApi("/v1/api").post(
    `/webinars/${webinarId}/comments`,
    {
      content,
    }
  );

  if (!response.data.status)
    throw new Error(response.data.message || "Error posting comment");
}

export async function deleteComment(commentId: string) {
  const response = await getApi("/v1/api").delete(
    `/webinars/comments/${commentId}`
  );

  if (!response.data.status)
    throw new Error(response.data.message || "Error deleting comment");
}

export async function logPlayback(webinarId: string) {
  const response = await getApi("/v1/api").post(
    `/webinars/${webinarId}/log_playback`
  );

  if (!response.data.status)
    throw new Error(response.data.message || "Error logging playback");
}
