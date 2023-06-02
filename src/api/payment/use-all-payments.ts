import { toPayment } from "@/transformers/payments";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useAllPayments = createQuery("all-payments", async () => {
  const response = await getApi().get("/fees");

  if (!response.data.status) throw new Error(response.data.message);

  const main: Payment[] =
    response.data.payload?.main_fees?.map(toPayment) || [];
  const sundry: Payment[] =
    response.data.payload?.sundry_fees?.map(toPayment) || [];

  return {
    main,
    sundry: sundry.filter((payment) => payment.code !== "25"),
  };
});
