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
    file: data.document_path.split("/").pop(),
    customTitle: data.other,
    reason: data.reason,
  } as DocumentUpload;
}
