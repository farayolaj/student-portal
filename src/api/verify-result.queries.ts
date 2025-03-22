import { queryOptions } from "@tanstack/react-query";
import {
  toDocumentUpload,
  toResultVerificationDocument,
  toResultVerificationResult,
} from "../transformers/verify-result";
import getApi from "./api";

export type VerificationTransaction =
  | {
      paymentId: string;
      isPaid: boolean;
    }
  | { error: string };

async function verifyResultVerificationTransaction() {
  const response = await getApi().get("/screen_verification");

  if (!response.data.status && !response.data.payload)
    return { error: response.data.message };

  return {
    isPaid: response.data.status,
    paymentId: response.data.payload?.payment_id,
  };
}

export function isVerificationTransactionError(
  result: VerificationTransaction
): result is { error: string } {
  return "error" in result;
}

async function getVerificationResult() {
  const response = await getApi().get("/result_verification");

  return toResultVerificationResult(response.data.payload);
}

async function getDocumentUploads() {
  const response = await getApi().get("/verification_document");

  return (response.data.payload || []).map(
    toDocumentUpload
  ) as DocumentUpload[];
}

async function getDocumentTypes() {
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

export const verifyResultQueries = {
  resultVerificationTransactionVerification: () =>
    queryOptions({
      queryKey: ["verify-result-verification-transaction"],
      queryFn: verifyResultVerificationTransaction,
    }),
  verificationResult: () =>
    queryOptions({
      queryKey: ["verification-result"],
      queryFn: getVerificationResult,
    }),
  documentUploads: () =>
    queryOptions({
      queryKey: ["document-uploads"],
      queryFn: getDocumentUploads,
    }),
  documentTypes: () =>
    queryOptions({
      queryKey: ["document-types"],
      queryFn: getDocumentTypes,
    }),
};
