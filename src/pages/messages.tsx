import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";
import MessageList from "@/components/messages/message-list";
import MessageView from "@/components/messages/message-view";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { useAllMessages } from "@/api/gmail/use-all-messages";

export default function MessageLayout() {
  const [selectedMessageId, setSelectedMessageId] = useState<string>();
  const isMobile = useBreakpointValue([true, null, false]);

  const allMessagesRes = useAllMessages({
    select: (data) => {
      return {
        ...data,
        pages: data.pages.map((page) => page.messages.map((m) => m.id)),
      };
    },
  });

  const showMessageView = !isMobile || selectedMessageId;

  return (
    <>
      <Seo title="Messages" />
      <PageTitle showBackButton>Messages</PageTitle>
      <Flex
        w="full"
        mt={-10}
        h="calc(100vh - 8.5rem)"
        mb={-16}
        pb={8}
        pos="relative"
        gap="1.5rem"
      >
        {(!isMobile || !showMessageView) && (
          <Box w={isMobile && !showMessageView ? "full" : "45%"} h="full">
            <MessageList
              messageIds={
                allMessagesRes.data?.pages.reduce(
                  (prev, curr) => [...prev, ...curr],
                  []
                ) || []
              }
              onSelect={setSelectedMessageId}
              selectedId={selectedMessageId}
              hasMore={allMessagesRes.hasNextPage}
              onLoadMore={allMessagesRes.fetchNextPage}
              isLoading={allMessagesRes.isFetchingNextPage}
            />
          </Box>
        )}
        {showMessageView && (
          <Box
            w={isMobile && showMessageView ? "full" : "55%"}
            h="full"
            overflowY="auto"
          >
            <MessageView
              messageId={selectedMessageId}
              onBack={() => setSelectedMessageId(undefined)}
            />
          </Box>
        )}
      </Flex>
    </>
  );
}
