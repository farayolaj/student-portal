import { useFetchDocument } from "../document/use-fetch-document";

type UseFetchReceiptOpts = {
  rrr: string;
  onError?: (error: Error) => void;
};

export function useFetchReceipt({ rrr, onError }: UseFetchReceiptOpts) {
  const url = `/mainreceipt?rrr_code=${encodeURIComponent(rrr)}`;
  return useFetchDocument({
    url,
    fileNameField: "receipt_name",
    fileField: "document",
    onError: (error) => {
      if (onError)
        onError(
          new Error("Error fetching receipt", {
            cause: error,
          })
        );
    },
  });
}
