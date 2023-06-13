import parse from "date-fns/parse";

export function toPayment(data: any): Payment {
  return {
    id: data.id || data.payment_id,
    code: data.payment_code,
    amount: data.total,
    isActive: data.is_active === "1",
    status: data.paid ? "paid" : "unpaid",
    title: data.description,
    dueDate: parse(data.date_due || data.due_date, "MMM. dd, yyyy", new Date()),
    level: data.level ? data.level + "00" : undefined,
    sessionId: data.session,
    paymentType: data.payment_category,
    containsPreselected: data.is_preselected_fee
      ? data.is_preselected_fee !== null
      : false,
    preselected:
      data.preselected_amount === 0
        ? undefined
        : {
            id: data.preselected,
            title: data.preselected_fee_readable,
            amount: data.preselected_amount,
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
