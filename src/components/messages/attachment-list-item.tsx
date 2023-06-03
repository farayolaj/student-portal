import { useAttachment } from "@/api/gmail/use-attachment";
import formatBytes from "@/utils/format-bytes";
import { Button, Icon, VStack, Text } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { BsPaperclip } from "react-icons/bs";

type AttachmentListItemProps = {
  messageId: string;
  data: MinimalAttachment;
};

export default function AttachmentListItem({
  messageId,
  data,
}: AttachmentListItemProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  useAttachment({
    variables: { attachment: data, messageId },
    enabled: isDownloading,
    onSettled: (payload) => {
      if (payload && payload.data) {
        const url = window.URL.createObjectURL(
          new Blob([payload.data], { type: payload.mimeType })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", payload.filename);
        link.click();
      }
      setIsDownloading(false);
    },
  });

  return (
    <Button
      variant="unstyled"
      display="flex"
      w="full"
      gap={2}
      justifyContent="space-between"
      p={4}
      onClick={() => setIsDownloading(true)}
      isDisabled={isDownloading}
    >
      <Icon as={BsPaperclip} boxSize={6} />
      <VStack w="90%" align="flex-start" spacing={0}>
        <Text
          as="span"
          fontSize="xs"
          fontWeight="semibold"
          textAlign="left"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
          w="full"
        >
          {data.filename}
        </Text>
        <Text as="span" fontSize="xs" fontWeight="normal">
          {formatBytes(data.size)}
        </Text>
      </VStack>
    </Button>
  );
}
