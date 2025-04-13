import { useQuery } from "@tanstack/react-query";
import { bookstoreQueries } from "../bookstore.queries";

export const useBookstore = () => useQuery(bookstoreQueries.books());
