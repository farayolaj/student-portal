import { useMessage } from "@/api/gmail/use-message";
import { Box, Flex, Heading, SkeletonText, Text } from "@chakra-ui/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

type MessageListItemProps = {
  messageId: string;
  isRead?: boolean;
  isSelected?: boolean;
  onSelect: (id: string) => void;
};

export default function MessageListItem({
  messageId,
  isRead,
  isSelected,
  onSelect,
}: MessageListItemProps) {
  const { data } = useMessage({ variables: { messageId } });

  return (
    <Box
      w="full"
      px={6}
      py={4}
      cursor="pointer"
      _hover={{ bg: "primary.100" }}
      tabIndex={0}
      onClick={() => onSelect(messageId)}
      bg={isSelected ? "primary.100" : undefined}
    >
      <Flex
        // direction={["column", null, null, null, null, "row"]}
        columnGap={2}
        justify="space-between"
        wrap="wrap"
        align="center"
      >
        <SkeletonText isLoaded={Boolean(data)} noOfLines={1}>
          <Heading
            as="h3"
            size="sm"
            fontWeight={isRead ? "normal" : "semibold"}
          >
            {data?.from?.replace(/<.*>/, "") || "Loading..."}
          </Heading>
        </SkeletonText>
        <SkeletonText isLoaded={Boolean(data)} noOfLines={1}>
          <Text
            as="span"
            textAlign="end"
            fontSize="xs"
            minW="20%"
            color="gray.600"
          >
            {data
              ? formatDistanceToNow(new Date(data.date), { addSuffix: true })
              : "Loading..."}
          </Text>
        </SkeletonText>
      </Flex>
      <SkeletonText isLoaded={Boolean(data)} noOfLines={1}>
        <Text fontSize="sm" fontWeight={isRead ? "normal" : "medium"} mt={2}>
          {data?.subject || "Loading..."}
        </Text>
      </SkeletonText>
      <SkeletonText mt={data ? 0 : 2} isLoaded={Boolean(data)} noOfLines={1}>
        <Text
          fontSize="sm"
          color="gray.600"
          noOfLines={2}
          dangerouslySetInnerHTML={{ __html: data?.snippet || "Loading..." }}
        ></Text>
      </SkeletonText>
    </Box>
  );
}
