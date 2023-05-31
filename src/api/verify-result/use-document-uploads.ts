import { createQuery } from "react-query-kit";
import getApi from "../api";
import { toDocumentUpload } from "@/transformers/verify-result";

export const useDocumentUploads = createQuery<DocumentUpload[]>({
  primaryKey: "document-uploads",
  queryFn: async () => {
    const response = await getApi().get("/verification_document");

    return (response.data.payload || []).map(
      toDocumentUpload
    ) as DocumentUpload[];
  },
});
