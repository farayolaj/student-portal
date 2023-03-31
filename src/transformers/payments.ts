import parse from "date-fns/parse";

export function toPayment(data: any): Payment {
  return {
    id: data.payment_id,
    amount: data.total,
    status: data.paid ? "paid" : "unpaid",
    title: data.description,
    dueDate: parse(data.due_date, "MMM. dd, yyyy", new Date()),
  };
}
