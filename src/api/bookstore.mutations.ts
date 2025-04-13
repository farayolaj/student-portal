import getApi from "./api";

export async function checkoutBookstore({
  books,
}: {
  books: { id: number; qty: number }[];
}) {
  const response = await getApi().post("/checkout_bookstore", {
    books: books.map((book) => ({
      id: book.id,
      qty: book.qty,
    })),
  });

  if (!response.data.status) throw new Error(response.data.message);

  return {
    orderId: response.data.payload.order_id,
    message: response.data.message,
  };
}

export async function initiateBookstorePayment({
  order_id,
}: {
  order_id: string;
}) {
  const response = await getApi().post("/bookstore_payment", {
    order_id,
  });

  if (!response.data.status) throw new Error(response.data.message);

  return response.data.payload;
}
