import parse from "date-fns/parse";

const transactionTypes: Record<string, Payment["transactionType"]> = {
  trans_normal: "normal",
  trans_custom: "custom",
};

export function toPayment(data: any): Payment {
  return {
    id: data.payment_id,
    code: data.payment_code,
    amount: parseInt(data.total),
    isActive: data.is_active === "1",
    status: data.paid ? "paid" : "unpaid",
    title: data.description,
    dueDate: parse(data.date_due || data.due_date, "MMM. dd, yyyy", new Date()),
    level: data.level ? data.level + "00" : undefined,
    sessionId: data.session,
    paymentType: data.payment_category,
    transactionType:
      data.payment_transaction && transactionTypes[data.payment_transaction],
    transactionRef: data.transaction_ref,
    containsPreselected: data.is_preselected_fee
      ? data.is_preselected_fee !== null
      : false,
    preselected:
      parseInt(data.preselected_amount) === 0
        ? undefined
        : {
            id: data.preselected,
            title: data.preselected_fee_readable,
            amount: parseInt(data.preselected_amount),
          },
    prerequisites:
      data.prerequisites?.map((pre: any) => ({
        id: pre.prerequisite,
        description: pre.description,
        isPaid: pre.paid,
      })) ?? [],
    transaction: data.transaction
      ? {
          id: data.transaction.transaction_id,
          amount: data.total,
          dateInitiated: parse(
            data.transaction.date_performed,
            "MMM. dd, yyyy",
            new Date()
          ),
          description: data.description,
          referenceNumber: data.transaction.order_id,
          rrr: data.transaction.rrr,
          status: data.paid ? "success" : "pending",
          datePayed: parse(
            data.transaction.date_completed,
            "MMM. dd, yyyy",
            new Date()
          ),
          publicKey: data.transaction.public_key,
        }
      : undefined,
  };
}

export function toTransaction(data: any): Transaction {
  return {
    id: data.id,
    amount: parseInt(data.total_amount),
    dateInitiated: new Date(Date.parse(data.date_performed)),
    description: data.payment_description,
    referenceNumber: data.transaction_ref,
    rrr: data.rrr || "",
    status:
      data.payment_status == "00" || data.payment_status == "01"
        ? "success"
        : "pending",
    datePayed: new Date(Date.parse(data.date_completed)),
    sessionId: data.session,
  };
}
