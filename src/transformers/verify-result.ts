/* eslint-disable @typescript-eslint/no-explicit-any */
export function toResultVerificationDocument(data: any) {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    customName: data.other,
  } as ResultVerificationDocumentType;
}

export function toDocumentUpload(data: any) {
  return {
    id: data.id,
    documentType: data.document_name || "Others",
    documentTypeId: data.verification_documents_requirement_id,
    file: data.document_path?.split("/")?.pop() || "",
    customTitle: data.other,
    reason: data.reason,
  } as DocumentUpload;
}

export function toResultVerificationResult(data: any) {
  return {
    status:
      data.verification_status === "Pending"
        ? "pending"
        : data.verification_status === "Verified"
        ? "verified"
        : "not-verified",
    remarks: (data.remarks || []).map((remark: any) => ({
      comment: remark.comment,
      dateCreated: new Date(Date.parse(remark.date_created)),
    })),
  } as ResultVerificationResult;
}
