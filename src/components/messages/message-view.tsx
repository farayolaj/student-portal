import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

type MessageViewProps = {
  data?: gapi.client.gmail.Message;
};

export default function MessageView({ data }: MessageViewProps) {
  const subject =
    data?.payload?.headers?.find((header) => header.name === "Subject")
      ?.value || "No Subject";
  const from =
    data?.payload?.headers?.find((header) => header.name === "From")?.value ||
    "Unknown Sender";
  const date = new Date(parseInt(data?.internalDate || "0"));
  const htmlContent = Buffer.from(
    data?.payload?.parts?.find((part) => part.mimeType === "text/html")?.body
      ?.data ||
      data?.payload?.body?.data ||
      "",
    "base64"
  ).toString("utf8");
  const plainContent = Buffer.from(
    data?.payload?.parts?.find((part) => part.mimeType === "text/plain")?.body
      ?.data || "",
    "base64"
  ).toString("utf8");

  return data ? (
    <Flex direction="column" pos="relative" h="100%" bg="white">
      <Box p={3} borderBottom="2px solid var(--chakra-colors-primary)">
        <Heading as="h3" fontSize="lg" fontWeight="medium">
          {subject}
        </Heading>
        <Box mt={2} fontSize="sm">
          <Text as="span" fontWeight="semibold">
            {from?.replace(/<.*>/, "")}
          </Text>
          <Text as="span">{from?.match(/<.*>/)?.at(0) || ""}</Text>
        </Box>
        <Box fontSize="xs" mt={1}>
          <Text as="span">
            {Intl.DateTimeFormat("en-NG", {
              dateStyle: "medium",
              timeStyle: "short",
              hour12: true,
            }).format(date)}{" "}
            (
            {formatDistanceToNow(date, {
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
        srcDoc={htmlContent || plainContent}
      ></iframe>
    </Flex>
  ) : (
    <Center h="100%">
      <Text>Select a message to view.</Text>
    </Center>
  );
}
