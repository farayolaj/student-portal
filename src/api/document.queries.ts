import { queryOptions } from "@tanstack/react-query";
import { toPortalDocument } from "../transformers/documents";
import getApi from "./api";

async function getAllDocuments() {
  const response = await getApi().get("/document");

  if (!response.data.status) throw new Error(response.data.message);

  return response.data.payload?.map(toPortalDocument) as PortalDocument[];
}

export const documentQueries = {
  all: () => ["documents"],
  list: () =>
    queryOptions({
      queryKey: [...documentQueries.all(), "list"],
      queryFn: getAllDocuments,
      retry: false,
    }),
};
