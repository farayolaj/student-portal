import { createQuery } from "react-query-kit";
import { getDashboardInfo } from "../../api/dashboard";

export const useDashboardInfo = createQuery("dashboard-info", getDashboardInfo);
