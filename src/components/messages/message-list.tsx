import { Card, CardBody, StackDivider, VStack } from "@chakra-ui/react";
import MessageListItem from "./message-list-item";

export default function MessageList() {
  return (
    <Card>
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
          <MessageListItem />
          <MessageListItem />
        </VStack>
      </CardBody>
    </Card>
  );
}
