import { useCallback, useState } from "react";
import getApi from "../api";

export type useDownloadDocumentOpts = {
  url: string;
  onError?: (error: Error) => void;
};

export function useDownloadDocument({ url, onError }: useDownloadDocumentOpts) {
  const [isLoading, setIsLoading] = useState(false);

  const intiateFetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getApi().get(url, { responseType: "blob" });
      const fileName =
        response.headers["content-disposition"]
          .split("filename=")[1]
          .replace(/"/g, "") || "receipt.pdf";
      const blobUrl = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const anchorElement = document.createElement("a");
      anchorElement.href = blobUrl;
      anchorElement.download = fileName;
      setIsLoading(false);

      anchorElement.click();
      URL.revokeObjectURL(blobUrl);
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
