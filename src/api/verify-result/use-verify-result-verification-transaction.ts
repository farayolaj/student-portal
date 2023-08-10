import { createQuery } from "react-query-kit";
import getApi from "../api";

export type VerificationTransaction =
  | {
      paymentId: string;
      isPaid: boolean;
    }
  | { error: string };

export const useVerifyResultVerificationTransaction =
  createQuery<VerificationTransaction>({
    primaryKey: "verify-result-verification-transaction",
    queryFn: async () => {
      const response = await getApi().get("/screen_verification");

      if (!response.data.status && !response.data.payload)
        return { error: response.data.message };

      return {
        isPaid: response.data.status,
        paymentId: response.data.payload?.payment_id,
      };
    },
  });

export function isVerificationTransactionError(
  result: VerificationTransaction
): result is { error: string } {
  return "error" in result;
}
