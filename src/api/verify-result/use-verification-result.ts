import { createQuery } from "react-query-kit";
import getApi from "../api";
import { toResultVerificationResult } from "@/transformers/verify-result";

export const useVerificationResult = createQuery({
  primaryKey: "verification_result",
  queryFn: async () => {
    const response = await getApi().get("/result_verification");

    return toResultVerificationResult(response.data.payload);
  },
});
