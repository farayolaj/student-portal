import {
  Button,
  Card,
  CardBody,
  Flex,
  Spinner,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import MessageListItem from "./message-list-item";

type MessageListProps = {
  messageIds: string[];
  selectedId?: string;
  onSelect: (id: string) => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoading?: boolean;
};

export default function MessageList({
  messageIds,
  onSelect,
  selectedId,
  hasMore,
  onLoadMore,
  isLoading,
}: MessageListProps) {
  return (
    <Flex direction="column" align="center" gap={4} h="full" w="full">
      <Card h="full" overflowY="auto" w="full">
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
            {messageIds.map((id) => (
              <MessageListItem
                key={id}
                messageId={id}
                onSelect={onSelect}
                isSelected={id === selectedId}
              />
            ))}
          </VStack>
        </CardBody>
      </Card>
      {hasMore && (
        <Button onClick={onLoadMore} isDisabled={isLoading} minW={20}>
          {isLoading ? <Spinner /> : "Load More"}
        </Button>
      )}
    </Flex>
  );
}
