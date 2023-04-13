import { toPayment } from "@/transformers/payments";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const usePaymentDetail = createQuery<Payment, { id: string }>(
  "payment-detail",
  async ({ queryKey: [_, { id }] }) => {
    const response = await getApi().get(
      `/fee_details?pid=${encodeURIComponent(id)}`
    );

    if (!response.data.status && !response.data.payload)
      throw new Error(response.data.message);

    const data = response.data.payload;
    return toPayment({
      ...data.payment_details,
      transaction: data.split_payment,
    });
  }
);
