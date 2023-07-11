import { createQuery } from "react-query-kit";
import getApi from "../api";
import { toTransaction } from "@/transformers/payments";

export const useAllTransactions = createQuery({
  primaryKey: "all-transactions",
  queryFn: async () => {
    const response = await getApi().get("/student_transaction_fees");

    if (!response.data.status) throw new Error(response.data.message);

    const data = response.data.payload.map(toTransaction) as Transaction[];
    return data.sort(
      (a, b) => b.dateInitiated.getTime() - a.dateInitiated.getTime()
    );
  },
});
