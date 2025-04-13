import getApi from "./api";

async function listBooks() {
  const response = await getApi().get("/all_bookstore");

  if (!response.data.status) throw new Error(response.data.message);

  return response.data.payload;
}


async function bookstoreTransaction() {
  const response = await getApi().get("/bookstore_transaction");

  if (!response.data.status) throw new Error(response.data.message);

  return response.data.payload;
}


export const bookstoreQueries = {
  books: () => ({
    queryKey: ["books"],
    queryFn: listBooks,
  }),
  transactions: () => ({
    queryKey: ["bookstore-transactions"],
    queryFn: bookstoreTransaction,
  }),
};