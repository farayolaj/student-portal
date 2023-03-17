import { useEffect, useState } from "react";
import getApi from "../api";

export function useCourseRegPrintUrl(sessionId: string, semester: number) {
  const semesterString = semester == 1 ? "first" : "second";
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const response = getApi()
      .get(
        `/courseregistrationprint?session=${encodeURIComponent(
          sessionId.split(".")[0]
        )}&semester=${semesterString}`,
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
        setError(
          new Error("Error generating course registration print", {
            cause: error,
          })
        );
      });
  }, [semesterString, sessionId]);

  return { url, isLoading, error };
}
