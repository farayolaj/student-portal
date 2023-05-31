import { createQuery } from "react-query-kit";
import getApi from "../api";
import { toResultVerificationDocument } from "@/transformers/verify-result";

export const useDocumentTypes = createQuery<ResultVerificationDocumentType[]>(
  "verify-result-doc-types",
  async () => {
    const response = await getApi().get("/verification_documents");

    if (!response.data.status && !response.data.payload)
      throw new Error(
        response.data.message ||
          "Error fetching result verification document types"
      );

    return response.data.payload.table_data.map(
      toResultVerificationDocument
    ) as ResultVerificationDocumentType[];
  }
);
