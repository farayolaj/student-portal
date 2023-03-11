import { getDashboardInfo } from "../../api/dashboard";
import { createQueryHelper } from "../../lib/create-query-helper";

export const useDashboardInfo = createQueryHelper(
  "dashboard-info",
  getDashboardInfo
);
