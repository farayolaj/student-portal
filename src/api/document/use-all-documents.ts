import { toPortalDocument } from "@/transformers/documents";
import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useAllDocuments = createQuery(
  "all-documents",
  async () => {
    const response = await getApi().get("/document");

    if (!response.data.status) throw new Error(response.data.message);

    return response.data.payload?.map(toPortalDocument) as PortalDocument[];
  },
  { retry: false }
);
