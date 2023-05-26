import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

type MessageViewProps = {
  data?: Message;
};

export default function MessageView({ data }: MessageViewProps) {
  return data ? (
    <Flex direction="column" pos="relative" h="100%" bg="white">
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
      <iframe
        width="100%"
        height="100%"
        srcDoc={data?.htmlContent || data?.plainContent}
      ></iframe>
    </Flex>
  ) : (
    <Center h="100%">
      <Text>Select a message to view.</Text>
    </Center>
  );
}
