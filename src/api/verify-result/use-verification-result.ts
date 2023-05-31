import { createQuery } from "react-query-kit";
import getApi from "../api";

export const useVerificationResult = createQuery<
  "verified" | "rejected" | "pending" | "not_found"
>({
  primaryKey: "verification_result",
  queryFn: async () => {
    const response = await getApi().get("/result_verification");

    if (!response.data.payload) return "not_found";

    if (response.data.payload.verification_status === "Verified")
      return "verified";
    else if (response.data.payload.verification_status === "Not verified")
      return "rejected";
    else if (response.data.payload.verification_status === "Pending")
      return "pending";
    else return "not_found";
  },
});
