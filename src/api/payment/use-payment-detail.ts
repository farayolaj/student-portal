import { toPayment } from "@/transformers/payments";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const usePaymentDetail = createQuery<
  Payment,
  {
    id: string;
    transactionRef?: string;
    transactionType?: Payment["transactionType"];
  }
>(
  "payment-detail",
  async ({ queryKey: [_, { id, transactionRef, transactionType }] }) => {
    const paths = {
      normal: "/fee_details",
      custom: "/custom_fee_details",
    };

    const response = await getApi().get(paths[transactionType || "normal"], {
      params: {
        pid: id,
        tid: transactionRef,
      },
    });

    if (!response.data.status && !response.data.payload)
      throw new Error(response.data.message);

    const data = response.data.payload;
    return toPayment({
      ...data.payment_details,
      transaction: data.split_payment,
    });
  }
);
