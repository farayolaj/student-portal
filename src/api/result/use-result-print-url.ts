import { useEffect, useState } from "react";
import getApi from "../api";

export function useResultPrintUrl(sessionId: string) {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const response = getApi()
      .get(
        `/coursesummaryprint?session=${encodeURIComponent(
          sessionId.split(".")[0]
        )}`,
        { responseType: "blob" }
      )
      .then((response) => {
        const url = URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        setIsLoading(false);
        console.log(url);
        setUrl(url);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(new Error("Error generating result print", { cause: error }));
      });
  }, [sessionId]);

  return { url, isLoading, error };
}
