import { toPayment } from "@/transformers/payments";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useAllPayments = createQuery("all-payments", async () => {
  const response = await getApi().get("/fees");

  if (!response.data.status) throw new Error(response.data.message);

  return {
    main: (response.data.payload?.main_fees?.map(toPayment) || []) as Payment[],
    sundry: (response.data.payload?.sundry_fees?.map(toPayment) ||
      []) as Payment[],
  };
});
