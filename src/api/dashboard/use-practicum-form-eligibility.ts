import { createQuery } from "react-query-kit";
import getApi from "../api";

export const usePracticumEligibility = createQuery(
  "practicum-form-eligibility",
  async () => {
    const response = await getApi().get("/practicum_form_eligibility");

    if (!response.data.status)
      throw new Error("Could not determine eligibility");

    return response.data;
  }
);
