import { queryOptions } from "@tanstack/react-query";
import getApi from "./api";

export const commonQueries = {
  portalAlert: () =>
    queryOptions({
      queryKey: ["portal-alert"],
      queryFn: async () => {
        const response = await getApi().get(`/student_notice_alert`);

        if (!response.data.status) throw new Error(response.data.message);

        return {
          header: (response.data.payload.notice_header &&
          response.data.payload.notice_header.length > 0
            ? response.data.payload.notice_header
            : undefined) as string | undefined,
          body: (response.data.payload.notice_body &&
          response.data.payload.notice_body.length > 0
            ? response.data.payload.notice_body
            : undefined) as string | undefined,
        };
      },
    }),
};
