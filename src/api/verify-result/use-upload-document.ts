import { createMutation } from "react-query-kit";
import getApi from "../api";

type UseUploadDocumentVariables = {
  existingId?: string;
  documentTypeId?: string;
  customName?: string;
  file: File;
};

export const useUploadDocument = createMutation<
  boolean,
  UseUploadDocumentVariables
>(async ({ file, customName, documentTypeId, existingId }) => {
  const formData = new FormData();

  documentTypeId &&
    formData.append("verification_documents_requirement_id", documentTypeId);
  customName && formData.append("other", customName);
  formData.append("document_path", file);

  const path = existingId
    ? `/upload_verification_document/${existingId}`
    : "/upload_verification_document";

  const response = await getApi().post(path, formData);

  if (!response.data.status && !response.data.payload)
    throw new Error(response.data.message || "Error submitting uploads.");

  return response.data.status as boolean;
});
