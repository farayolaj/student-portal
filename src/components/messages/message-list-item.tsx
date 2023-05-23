import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

type MessageListItemProps = {
  data: {
    id: string;
    from: string;
    subject: string;
    date: Date;
    snippet: string;
  };
  isRead?: boolean;
  isSelected?: boolean;
  onSelect: (id: string) => void;
};

export default function MessageListItem({
  data: { id, from, subject, date, snippet },
  isRead,
  isSelected,
  onSelect,
}: MessageListItemProps) {
  return (
    <Box
      w="full"
      px={6}
      py={4}
      cursor="pointer"
      _hover={{ bg: "primary.100" }}
      tabIndex={0}
      onClick={() => onSelect(id)}
      bg={isSelected ? "primary.100" : undefined}
    >
      <Flex gap={2} justify="space-between" align="center">
        <Heading as="h3" size="sm" fontWeight={isRead ? "normal" : "semibold"}>
          {from.replace(/<.*>/, "")}
        </Heading>
        <Text
          as="span"
          textAlign="end"
          fontSize="xs"
          minW="20%"
          color="gray.600"
        >
          {formatDistanceToNow(new Date(date), { addSuffix: true })}
        </Text>
      </Flex>
      <Text fontSize="sm" fontWeight={isRead ? "normal" : "medium"} mt={2}>
        {subject}
      </Text>
      <Text fontSize="sm" color="gray.600" noOfLines={2}>
        {snippet}
      </Text>
    </Box>
  );
}
