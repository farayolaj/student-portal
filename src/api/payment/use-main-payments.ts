import { toPayment } from "@/transformers/payments";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useMainPayments = createQuery("main-payments", async () => {
  const response = await getApi().get("/fees");

  if (!response.data.status) throw new Error(response.data.message);

  const payments: Payment[] = response.data.payload?.map(toPayment) || [];

  return payments;
});
