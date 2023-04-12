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
          // Todo: Get the correct initiation date
          dateInitiated: new Date(),
          description: data.description,
          referenceNumber: data.transaction.order_id,
          rrr: data.transaction.rrr,
          status: data.paid ? "success" : "pending",
          // Todo: Get the correct date paid
          datePayed: new Date(),
        }
      : undefined,
  };
}
