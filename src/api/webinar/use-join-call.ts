import { useCallback, useState } from "react";
import getApi from "../api";

async function getJoinUrl(webinarId: string) {
  const response = await getApi("/v1/api").get(
    `/webinars/${webinarId}/join_url`
  );

  if (!response.data.status) throw new Error(response.data.message);

  return response.data.payload;
}

export function useJoinCall({ onError }: { onError?: (error: Error) => void }) {
  const [isJoining, setIsJoining] = useState(false);

  const join = useCallback(
    async (webinarId: string) => {
      setIsJoining(true);
      try {
        const url = await getJoinUrl(webinarId);

        window.open(url, "_blank");
      } catch (error: unknown) {
        if (error instanceof Error) {
          onError?.(error);
        } else console.error(error);
      } finally {
        setIsJoining(false);
      }
    },
    [onError]
  );

  return {
    isJoining,
    join,
  };
}
