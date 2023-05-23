import { Card, CardBody, StackDivider, VStack } from "@chakra-ui/react";
import MessageListItem from "./message-list-item";

type MessageListProps = {
  messages: gapi.client.gmail.Message[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

export default function MessageList({
  messages,
  onSelect,
  selectedId,
}: MessageListProps) {
  return (
    <Card h="full" overflowY="auto">
      <CardBody p={0}>
        <VStack
          divider={
            <StackDivider
              w="calc(100% - 2rem)"
              alignSelf="center"
              style={{ margin: "0" }}
            />
          }
        >
          {messages.map((message) => (
            <MessageListItem
              key={message.id}
              data={{
                id: message.id || "",
                date: new Date(parseInt(message.internalDate || "0")),
                from:
                  message.payload?.headers?.find(
                    (header) => header.name === "From"
                  )?.value || "Unknown Sender",
                subject:
                  message.payload?.headers?.find(
                    (header) => header.name === "Subject"
                  )?.value || "No Subject",
                snippet: message.snippet || "",
              }}
              onSelect={onSelect}
              isSelected={message.id === selectedId}
            />
          ))}
        </VStack>
      </CardBody>
    </Card>
  );
}
