import { getAttachment } from "@/gapi/messages";
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

  const onClick = useCallback(() => {
    setIsDownloading(true);
    getAttachment(data, messageId)
      .then((res) => {
        if (res.data) {
          const url = window.URL.createObjectURL(
            new Blob([res.data], { type: res.mimeType })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", res.filename);
          link.click();
        }
      })
      .finally(() => setIsDownloading(false));
  }, [data, messageId]);

  return (
    <Button
      variant="unstyled"
      display="flex"
      w="full"
      gap={2}
      p={2}
      onClick={onClick}
      isDisabled={isDownloading}
    >
      <Icon as={BsPaperclip} boxSize={6} />
      <VStack w="full" align="flex-start" spacing={0}>
        <Text as="span" fontSize="xs" fontWeight="semibold">
          {data.filename}
        </Text>
        <Text as="span" fontSize="xs" fontWeight="normal">
          {formatBytes(data.size)}
        </Text>
      </VStack>
    </Button>
  );
}
