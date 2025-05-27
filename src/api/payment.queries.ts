import { queryOptions } from "@tanstack/react-query";
import {
  PAYMENT_OPTIONS,
  toPayment,
  toTransaction,
  TRANSACTION_TYPES,
} from "../transformers/payments";
import getApi from "./api";

async function listTransactions() {
  const response = await getApi().get("/student_transaction_fees");

  if (!response.data.status) throw new Error(response.data.message);

  const data = response.data.payload.map(toTransaction) as Transaction[];
  return data.sort(
    (a, b) => b.dateInitiated.getTime() - a.dateInitiated.getTime()
  );
}

async function verifyTransactions(rrr: string, order_id?: string) {
  const response = await getApi().get("/verify_transaction", {
    params: { rrr_code: rrr, order_id },
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

async function getPendingTransaction(id: string, session: string) {
  const response = await getApi().get("/validate_pending_transaction", {
    params: { payment_id: id, session },
  });

  if (!response.data.status) throw new Error(response.data.message);

  const {
    payment_id,
    payment_option,
    description,
    payment_transaction,
    rrr_code,
    transaction_ref,
  } = response.data.payload || {};

  return !rrr_code && !transaction_ref
    ? null
    : {
        paymentId: payment_id as string,
        paymentOption: payment_option ? PAYMENT_OPTIONS[payment_option] : null,
        description: description as string,
        transactionType: TRANSACTION_TYPES[payment_transaction],
        rrr: rrr_code as string,
        transactionRef: transaction_ref as string,
      };
}

export const paymentQueries = {
  transactionsList: () =>
    queryOptions({
      queryKey: ["transactions"],
      queryFn: () => listTransactions(),
    }),
  verifyTransaction: (rrr: string, order_id?: string) =>
    queryOptions({
      queryKey: ["transactions", "verify", rrr, order_id],
      queryFn: () => verifyTransactions(rrr, order_id),
    }),
  all: () => ["payments"],
  mainList: () =>
    queryOptions({
      queryKey: [...paymentQueries.all(), "main"],
      queryFn: () => getMainPayments(),
      staleTime: 0,
    }),
  sundryList: () =>
    queryOptions({
      queryKey: [...paymentQueries.all(), "sundry"],
      queryFn: () => getSundryPayments(),
    }),
  detailsBy: (
    id: string,
    transactionRef?: string,
    transactionType?: Payment["transactionType"]
  ) =>
    queryOptions({
      queryKey: [
        ...paymentQueries.mainList().queryKey,
        id,
        transactionRef,
        transactionType,
      ],
      queryFn: () => getPaymentDetails(id, transactionRef, transactionType),
      staleTime: 0,
    }),
  allPendingTransactions: () => ["pending_transactions"],
  pendingTransaction: (id: string, session: string) =>
    queryOptions({
      queryKey: [paymentQueries.allPendingTransactions(), id, session],
      queryFn: () => getPendingTransaction(id, session),
      staleTime: 0,
    }),
};
