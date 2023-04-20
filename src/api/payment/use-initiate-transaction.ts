import { createMutation } from "react-query-kit";
import getApi from "../api";
import { toPayment } from "@/transformers/payments";

export const useInitiateTransaction = createMutation(
  async ({ id, preselectedId }: { id: string; preselectedId?: string }) => {
    const response = await getApi().get("/initiate_fee_details", {
      params: { pid: id, preselected: preselectedId },
    });

    if (!response.data.status) throw new Error(response.data.message);

    const data = response.data.payload;
    return toPayment({
      ...data.payment_details,
      transaction: data.split_payment,
    });
  }
);
