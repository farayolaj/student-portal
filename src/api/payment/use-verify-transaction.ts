import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useVerifyTransaction = createQuery<boolean, { rrr: string }>(
  "verify-transaction",
  async ({ queryKey: [_, { rrr }] }) => {
    const response = await getApi().get("/verify_transaction", {
      params: { rrr_code: rrr },
    });

    return response.data.status as boolean;
  }
);
