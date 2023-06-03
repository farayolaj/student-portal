import { createQuery } from "react-query-kit";
import getApi from "../api";
import { toAttachment } from "@/transformers/messages";

export const useAttachment = createQuery<
  Attachment,
  { messageId: string; attachment: MinimalAttachment }
>({
  primaryKey: "gmail-attachment",
  queryFn: async ({ queryKey: [_, params] }) => {
    const response = await getApi().get("/message_detail_attachment", {
      params: {
        message_id: params.messageId,
        attachment_id: params.attachment.id,
      },
    });

    if (response.status !== 200) {
      throw new Error(
        `Error fetching attachment with id ${params.attachment.id} for message with id ${params.messageId}`
      );
    }

    return toAttachment(response.data, params.attachment);
  },
});
