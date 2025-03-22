import { queryOptions } from "@tanstack/react-query";
import { toDashboardInfo } from "../transformers/dashboard";
import getApi from "./api";

async function getPracticumEligibility() {
  const response = await getApi().get("/practicum_form_eligibility");

  if (!response.data.status) throw new Error(response.data.message);

  return response.data.payload as {
    is_submitted: boolean;
    approved_practicum_school: string;
    approved_supervisor: string;
    print_url: string;
    course_code: string;
  };
}

export async function getDashboardInfo() {
  const response = await getApi().get("/student_dashboard");

  if (!response.data.status) throw new Error("Could not fetch dashboard info");

  return toDashboardInfo(response.data.payload);
}

export const dashboardQueries = {
  practicumEligibility: () =>
    queryOptions({
      queryKey: ["practicum-form-eligibility"],
      queryFn: getPracticumEligibility,
    }),
  dashboardInfo: () =>
    queryOptions({
      queryKey: ["dashboard-info"],
      queryFn: getDashboardInfo,
    }),
};
