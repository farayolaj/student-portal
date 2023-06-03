import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Spinner,
  Text,
  chakra,
} from "@chakra-ui/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import AttachmentListView from "./attachment-list-view";

type MessageViewProps = {
  data?: Message;
  isLoading?: boolean;
  onBack?: () => void;
};

export default function MessageView({
  data,
  isLoading,
  onBack,
}: MessageViewProps) {
  if (isLoading)
    return (
      <Center h="100%">
        <Spinner size="xl" color="primary.500" />
      </Center>
    );

  return data ? (
    <Flex
      direction="column"
      pos="relative"
      h="100%"
      bg="white"
      overflowX="hidden"
    >
      <Box
        display={[null, null, "none"]}
        borderBottom="1px solid var(--chakra-colors-primary)"
      >
        <Button
          display="inline-flex"
          alignItems="center"
          aria-label="Back to list"
          variant="unstyled"
          onClick={onBack}
        >
          <ArrowBackIcon m={4} />
          <Text as="span" ml={2} mt={1} fontWeight="semibold">
            Back to list
          </Text>
        </Button>
      </Box>
      <Box p={3} borderBottom="2px solid var(--chakra-colors-primary)">
        <Heading as="h3" fontSize="lg" fontWeight="medium">
          {data?.subject}
        </Heading>
        <Box mt={2} fontSize="sm">
          <Text as="span" fontWeight="semibold">
            {data?.from?.replace(/<.*>/, "")}
          </Text>
          <Text as="span">{data?.from?.match(/<.*>/)?.at(0) || ""}</Text>
        </Box>
        <Box fontSize="xs" mt={1}>
          <Text as="span">
            {Intl.DateTimeFormat("en-NG", {
              dateStyle: "medium",
              timeStyle: "short",
              hour12: true,
            }).format(data?.date)}{" "}
            (
            {formatDistanceToNow(data?.date, {
              includeSeconds: true,
              addSuffix: true,
            })}
            )
          </Text>
        </Box>
      </Box>
      <Box h="full">
        <chakra.iframe
          width="100%"
          height="100%"
          srcDoc={data?.htmlContent || data?.plainContent}
        ></chakra.iframe>
      </Box>
      {data.attachments ? (
        <AttachmentListView messageId={data.id} data={data.attachments} />
      ) : null}
    </Flex>
  ) : (
    <Center h="100%">
      <Text>Select a message to view.</Text>
    </Center>
  );
}
