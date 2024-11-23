import parse from "date-fns/parse";

const transactionTypes: Record<string, Payment["transactionType"]> = {
  trans_normal: "normal",
  trans_custom: "custom",
};

const paymentOptions: Record<string, Payment["paymentOption"]> = {
  full_first_sem: "full",
  part_first_sem_a: "part",
  part_first_sem_b: "balance",
  full_second_sem: "full",
  part_second_sem_a: "part",
  part_second_sem_b: "balance",
};

export function toPayment(data: any): Payment {
  return {
    id: data.payment_id,
    code: data.payment_code,
    amount: parseInt(data.total),
    isSchoolFee: data.payment_code2 === "1" || data.payment_code2 === "2",
    isActive: data.is_active === "1",
    status: data.paid ? "paid" : "unpaid",
    title: data.description,
    dueDate: parse(data.date_due || data.due_date, "MMM. dd, yyyy", new Date()),
    level: data.level ? data.level + "00" : undefined,
    sessionId: data.session,
    paymentType: data.payment_category,
    rawPaymentOption: data.payment_type_option || null,
    paymentOption: data.payment_type_option
      ? paymentOptions[data.payment_type_option]
      : null,
    transactionType:
      data.payment_transaction && transactionTypes[data.payment_transaction],
    transactionRef: data.transaction_ref,
    containsPreselected: data.preselected ? data.preselected !== 0 : false,
    preselected:
      parseInt(data.preselected_amount || 0) === 0
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
        transactionType:
          pre.payment_transaction && transactionTypes[pre.payment_transaction],
        transactionRef: pre.transaction_ref,
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
    rrr: data.rrr_code || "",
    status:
      data.payment_status == "00" || data.payment_status == "01"
        ? "success"
        : "pending",
    datePayed: new Date(Date.parse(data.date_completed)),
    sessionId: data.session,
    programmeName: data.programme_name,
  };
}
