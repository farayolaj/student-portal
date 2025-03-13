import { queryOptions } from "@tanstack/react-query";
import { toPayment, toTransaction } from "../transformers/payments";
import getApi from "./api";

async function listTransactions() {
  const response = await getApi().get("/student_transaction_fees");

  if (!response.data.status) throw new Error(response.data.message);

  const data = response.data.payload.map(toTransaction) as Transaction[];
  return data.sort(
    (a, b) => b.dateInitiated.getTime() - a.dateInitiated.getTime()
  );
}

async function verifyTransactions(rrr: string) {
  const response = await getApi().get("/verify_transaction", {
    params: { rrr_code: rrr },
  });

  return response.data.status as boolean;
}

async function getMainPayments() {
  const response = await getApi().get("/fees");

  if (!response.data.status) throw new Error(response.data.message);

  const payments: Payment[] = response.data.payload?.map(toPayment) || [];

  return payments;
}

async function getSundryPayments() {
  const response = await getApi().get("/sundry_fees");

  if (!response.data.status) throw new Error(response.data.message);

  const payments: Payment[] = response.data.payload?.map(toPayment) || [];

  return payments.sort((a, b) => {
    if (a.title < b.title) return -1;
    else if (a.title > b.title) return 1;
    else return 0;
  });
}

async function getPaymentDetails(
  id: string,
  transactionRef?: string,
  transactionType?: Payment["transactionType"]
) {
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

export const paymentQueries = {
  transactionsList: () =>
    queryOptions({
      queryKey: ["transactions"],
      queryFn: () => listTransactions(),
    }),
  verifyTransaction: (rrr: string) =>
    queryOptions({
      queryKey: ["transactions", "verify", rrr],
      queryFn: () => verifyTransactions(rrr),
    }),
  all: () => ["payments"],
  mainList: () =>
    queryOptions({
      queryKey: [...paymentQueries.all(), "main"],
      queryFn: () => getMainPayments(),
      initialData: [],
    }),
  sundryList: () =>
    queryOptions({
      queryKey: [...paymentQueries.all(), "sundry"],
      queryFn: () => getSundryPayments(),
      initialData: [],
    }),
  details: () => [...paymentQueries.all(), "detail"],
  detailsBy: (
    id: string,
    transactionRef?: string,
    transactionType?: Payment["transactionType"]
  ) =>
    queryOptions({
      queryKey: [
        ...paymentQueries.details(),
        id,
        transactionRef,
        transactionType,
      ],
      queryFn: () => getPaymentDetails(id, transactionRef, transactionType),
    }),
};
