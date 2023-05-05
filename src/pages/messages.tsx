import PageTitle from "@/components/common/page-title";
import Seo from "@/components/common/seo";
import MessageList from "@/components/messages/message-list";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import { BiMessageRoundedAdd } from "react-icons/bi";

export default function MessageLayout() {
  return (
    <>
      <Seo title="Messages" />
      <PageTitle showBackButton>Messages</PageTitle>
      {/*       <Flex justify="flex-end" mt={-10}>
        <Button size="sm">
          Compose <Icon as={BiMessageRoundedAdd} boxSize={6} pl={2} />
        </Button>
      </Flex> */}
      <Flex w="full" mt={-10}>
        <Box w="50%" pr="1.5rem">
          <MessageList />
        </Box>
        <Box w="50%"></Box>
      </Flex>
    </>
  );
}
