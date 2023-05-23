import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";
import MessageList from "@/components/messages/message-list";
import MessageView from "@/components/messages/message-view";
import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AuthWall from "@/components/messages/auth-wall";
import { useGapiAuth } from "@/components/common/gapi-auth";

async function listMessages({ limit = 10 }: { limit?: number }) {
  const response = await gapi.client.gmail.users.messages.list({
    userId: "me",
    maxResults: limit,
  });

  if (response.status !== 200) {
    throw new Error("Error fetching messages");
  }

  return response.result.messages;
}

async function getMessage({ id }: { id: string }) {
  const response = await gapi.client.gmail.users.messages.get({
    userId: "me",
    id,
  });

  if (response.status !== 200) {
    throw new Error(`Error fetching message with id ${id}`);
  }

  return response.result;
}

export default function MessageLayout() {
  const [messages, setMessages] = useState<gapi.client.gmail.Message[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string>();
  const { isAuthorised } = useGapiAuth();

  useEffect(() => {
    if (isAuthorised) {
      listMessages({ limit: 10 }).then((messages) => {
        Promise.all(
          messages?.map((message) => getMessage({ id: message.id || "" })) || []
        ).then((messages) => setMessages(messages));
      });
    }
  }, [isAuthorised]);

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
      >
        <Box w="45%" pr="1.5rem" h="full">
          <MessageList
            messages={messages || []}
            onSelect={setSelectedMessageId}
            selectedId={selectedMessageId}
          />
        </Box>
        <Box w="55%" h="full" overflowY="auto">
          <MessageView
            data={messages.find((v) => v.id === selectedMessageId)}
          />
        </Box>
        <AuthWall
          onAuth={() => {
            console.log("Authorised");
          }}
        />
      </Flex>
    </>
  );
}
