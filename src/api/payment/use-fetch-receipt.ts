import { useFetchDocument } from "../document/use-fetch-document";

type UseFetchReceiptOpts = {
  trxId: string;
  onError?: (error: Error) => void;
};

export function useFetchReceipt({ trxId, onError }: UseFetchReceiptOpts) {
  const url = `/mainreceipt?transaction=${encodeURIComponent(trxId)}`;
  return useFetchDocument({
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
