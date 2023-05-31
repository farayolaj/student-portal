import { createMutation } from "react-query-kit";
import getApi from "../api";

type UseUploadDocumentVariables = {
  documentTypeId?: string;
  customName?: string;
  studentId: string;
  file: File;
};

export const useUploadDocument = createMutation<
  boolean,
  UseUploadDocumentVariables
>(async ({ file, studentId, customName, documentTypeId }) => {
  const formData = new FormData();

  documentTypeId &&
    formData.append("verification_documents_requirement_id", documentTypeId);
  customName && formData.append("other", customName);
  formData.append("students_id", studentId);
  formData.append("document_path", file);

  const response = await getApi().post(
    "/upload_verification_document",
    formData
  );

  if (!response.data.status && !response.data.payload)
    throw new Error(response.data.message || "Error submitting uploads.");

  return response.data.status as boolean;
});
