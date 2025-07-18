import { TRANSACTION_TYPES } from "@/transformers/payments";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import getApi from "../api";

// Todo: Needs refactoring
export function useCourseRegPrintUrl(sessionId: string, semester: number) {
  const semesterString = semester == 1 ? "first" : "second";
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [prerequisites, setPrerequisites] = useState<
    Array<{
      id: string;
      name: string;
      transactionType: Payment["transactionType"];
      transactionRef?: string;
    }>
  >();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setUrl(null);
    setPrerequisites(undefined);

    if (!sessionId || !semesterString) {
      setIsLoading(false);
      setError(new Error("Session ID and semester are required"));
      return;
    }

    getApi()
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
        if (response.headers["content-type"] === "application/json") {
          // Only reason for a json response is an error
          setIsLoading(false);
          const data = response.data;

          setError(
            new Error(
              data.message || "Error generating course registration print"
            )
          );
          return;
        }

        const url = URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        setIsLoading(false);
        setUrl(url);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error instanceof AxiosError && error.status == 403) {
          const data = error.response?.data as Blob;

          data.text().then((text) => {
            const data = JSON.parse(text);

            if (
              data.payload &&
              Array.isArray(data.payload) &&
              data.payload.length > 0
            ) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const payload = data.payload as Array<any>;

              setPrerequisites(
                payload.map((p) => ({
                  id: p.prerequisite,
                  name: p.description,
                  amount: p.amount,
                  transactionType: TRANSACTION_TYPES[p.transactionType],
                  transactionRef: p.transactionRef,
                }))
              );
            } else {
              setPrerequisites(undefined);
            }
          });
        } else {
          setError(
            new Error("Error generating course registration print", {
              cause: error,
            })
          );
        }
      });
  }, [semesterString, sessionId]);

  return { url, isLoading, error, prerequisites };
}
