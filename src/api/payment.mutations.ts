import { toPayment } from "../transformers/payments";
import getApi from "./api";

export async function initiateTransaction({
  id,
  preselectedId,
  paymentType,
  rawPaymentOption,
  transactionRef,
  transactionType,
}: {
  id: string;
  preselectedId?: string;
  paymentType: "main" | "sundry";
  rawPaymentOption?: Payment["rawPaymentOption"];
  transactionRef?: string;
  transactionType?: Payment["transactionType"];
}) {
  const paths = {
    normal: "/initiate_fee_details",
    custom: "/custom_initiate_fee_details",
  };

  const response = await getApi().get(paths[transactionType || "normal"], {
    params: {
      pid: id,
      payment_type: paymentType,
      preselected: preselectedId,
      tid: transactionRef,
      payment_option: rawPaymentOption || undefined,
    },
  });

  if (!response.data.status) throw new Error(response.data.message);

  const data = response.data.payload;
  return toPayment({
    ...data.payment_details,
    transaction: data.split_payment,
  });
}

export async function cancelPayment({ rrr }: { rrr: string }) {
  const response = await getApi().get("/cancel_transaction", {
    params: {
      rrr_code: rrr,
    },
  });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}
