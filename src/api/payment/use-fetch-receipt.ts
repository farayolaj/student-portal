import { useDownloadDocument } from "../document/use-download-document";

type UseFetchReceiptOpts = {
  rrr: string;
  onError?: (error: Error) => void;
};

export function useFetchReceipt({ rrr, onError }: UseFetchReceiptOpts) {
  const url = `/mainreceipt?rrr_code=${encodeURIComponent(rrr)}`;

  return useDownloadDocument({
    url,
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
