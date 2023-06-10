import { createInfiniteQuery } from "react-query-kit";
import getApi from "../api";
import { toMinimalMessage } from "@/transformers/mails";

export const useAllMessages = createInfiniteQuery<{
  nextPageToken: string;
  messages: MinimalMessage[];
}>({
  primaryKey: "all-gmail-messages",
  getNextPageParam: (lastPage, _pages) => lastPage.nextPageToken,
  queryFn: async ({ pageParam }) => {
    const response = await getApi().get("/list_messages", {
      params: {
        page_token: pageParam,
      },
    });

    if (response.status !== 200) {
      throw new Error("Error listing messages");
    }

    return {
      nextPageToken: response.data.nextPageToken,
      messages: response.data.messages.map(toMinimalMessage),
    };
  },
});
