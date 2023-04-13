import parse from "date-fns/parse";

export function toPayment(data: any): Payment {
  return {
    id: data.payment_id,
    amount: data.total,
    status: data.paid ? "paid" : "unpaid",
    title: data.description,
    dueDate: parse(data.date_due || data.due_date, "MMM. dd, yyyy", new Date()),
    level: data.level ? data.level + "00" : undefined,
    sessionId: data.session,
    transaction: data.transaction
      ? {
          id: data.transaction.order_id,
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
