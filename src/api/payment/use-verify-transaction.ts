import { createMutation } from "react-query-kit";
import getApi from "../api";

export const useVerifyTransaction = createMutation<boolean, { rrr: string }>(
  async ({ rrr }) => {
    const response = await getApi().get("/verify_transaction", {
      params: { rrr_code: rrr },
    });

    return response.data.status as boolean;
  }
);
