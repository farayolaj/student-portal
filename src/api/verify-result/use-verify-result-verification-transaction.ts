import { createQuery } from "react-query-kit";
import getApi from "../api";

type VerificationTransaction = {
  paymentId: string;
  isPaid: boolean;
};

export const useVerifyResultVerificationTransaction =
  createQuery<VerificationTransaction>({
    primaryKey: "verify-result-verification-transaction",
    queryFn: async () => {
      const response = await getApi().get("/screen_verification");

      return {
        isPaid: response.data.status,
        paymentId: response.data.payload?.payment_id,
      };
    },
  });
