import { useEffect, useState } from "react";
import getApi from "../api";
import { AxiosError } from "axios";

export function useCourseRegPrintUrl(sessionId: string, semester: number) {
  const semesterString = semester == 1 ? "first" : "second";
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const response = getApi()
      .get(
        `/courseregistrationprint?session=${encodeURIComponent(
          sessionId.split(".")[0]
        )}&semester=${semesterString}`,
        {
          responseType: "blob",
          validateStatus(status) {
            return status < 400;
          },
        }
      )
      .then((response) => {
        const url = URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        setIsLoading(false);
        setUrl(url);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error instanceof AxiosError && error.status == 403) {
          setError(new Error(error.response?.statusText));
        } else {
          setError(
            new Error("Error generating course registration print", {
              cause: error,
            })
          );
        }
      });
  }, [semesterString, sessionId]);

  return { url, isLoading, error };
}
