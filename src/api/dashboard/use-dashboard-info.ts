import getApi from "../api";
import { toDashboardInfo } from "../../transformers/dashboard";
import { createQuery } from "react-query-kit";

export const useDashboardInfo = createQuery("dashboard-info", async () => {
  const response = await getApi().get("/student_dashboard");

  if (!response.data.status) throw new Error("Could not fetch dashboard info");

  return toDashboardInfo(response.data.payload);
});
