import { toPayment } from "@/transformers/payments";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useSundryPayments = createQuery("sundry-payments", async () => {
  const response = await getApi().get("/sundry_fees");

  if (!response.data.status) throw new Error(response.data.message);

  const payments: Payment[] = response.data.payload?.map(toPayment) || [];

  return payments.sort((a, b) => {
    if (a.title < b.title) return -1;
    else if (a.title > b.title) return 1;
    else return 0;
  });
});
