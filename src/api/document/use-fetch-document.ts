import { useCallback, useState } from "react";
import getApi from "../api";

type UseFetchDocument = {
  url: string;
  onError?: (error: Error) => void;
};

export function useFetchDocument({ url, onError }: UseFetchDocument) {
  const [isLoading, setIsLoading] = useState(false);

  const intiateFetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getApi().get(url, { responseType: "blob" });
      const blobUrl = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      setIsLoading(false);
      window.open(blobUrl, "_blank");
    } catch (error) {
      setIsLoading(false);
      if (onError)
        onError(
          new Error("Error fetching document", {
            cause: error,
          })
        );
    }
  }, [onError, url]);

  return {
    intiateFetch,
    isLoading,
  };
}
