import { createQuery } from "react-query-kit";
import getApi from "../api";
import { toMessage } from "@/transformers/messages";

export const useMessage = createQuery<Message, { messageId: string }>({
  primaryKey: "gmail-message",
  queryFn: async ({ queryKey: [_, params] }) => {
    const response = await getApi().get("/message_detail", {
      params: {
        message_id: params.messageId,
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error fetching message with id ${params.messageId}`);
    }

    return toMessage(response.data);
  },
  staleTime: Infinity,
});
