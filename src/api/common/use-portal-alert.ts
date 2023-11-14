import { createQuery } from "react-query-kit";
import getApi from "../api";

export const usePortalAlert = createQuery<{ header: string; body: string }>(
  "portal-notice",
  async () => {
    const response = await getApi().get(`/student_notice_alert`);

    if (!response.data.status) throw new Error(response.data.message);

    return {
      header: response.data.notice_header,
      body: response.data.notice_body,
    };
  }
);
