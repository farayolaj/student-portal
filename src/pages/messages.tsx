import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";
import MessageList from "@/components/messages/message-list";
import MessageView from "@/components/messages/message-view";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AuthWall from "@/components/messages/auth-wall";
import { useGapiAuth } from "@/components/common/gapi-auth";
import { getMessage, listMessages } from "@/gapi/messages";

export default function MessageLayout() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string>();
  const { isAuthorised } = useGapiAuth();
  const isMobile = useBreakpointValue([true, null, false]);

  useEffect(() => {
    if (isAuthorised) {
      listMessages({ limit: 10 }).then((messages) => {
        Promise.all(
          messages?.map((message) => getMessage({ id: message.id || "" })) || []
        ).then((messages) => setMessages(messages));
      });
    }
  }, [isAuthorised]);

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
              messages={messages || []}
              onSelect={setSelectedMessageId}
              selectedId={selectedMessageId}
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
              data={messages.find((v) => v.id === selectedMessageId)}
              onBack={() => setSelectedMessageId(undefined)}
            />
          </Box>
        )}
        <AuthWall
          onAuth={() => {
            console.log("Authorised");
          }}
        />
      </Flex>
    </>
  );
}
