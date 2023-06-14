import { useCallback, useState } from "react";
import getApi from "../api";
import printHtml from "@/lib/print-html";

export type UseFetchDocumentOpts = {
  url: string;
  fileNameField: string;
  fileField: string;
  onError?: (error: Error) => void;
};

export function useFetchDocument({
  url,
  fileNameField,
  fileField,
  onError,
}: UseFetchDocumentOpts) {
  const [isLoading, setIsLoading] = useState(false);

  const intiateFetch = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getApi().get(url);

      if (!response.data.status) throw new Error("Request failed");

      const fileName = response.data.payload[fileNameField];
      const fileText = response.data.payload[fileField];

      console.log(fileName);

      if (!fileName || !fileText)
        throw new Error("Invalid response: Expected fields not found");

      await printHtml(fileText, fileName);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (onError)
        onError(
          new Error("Error fetching document", {
            cause: error,
          })
        );
    }
  }, [fileField, fileNameField, onError, url]);

  return {
    intiateFetch,
    isLoading,
  };
}
