import { VStack, StackDivider } from "@chakra-ui/react";
import AttachmentListItem from "./attachment-list-item";

type AttachmentListViewProps = {
  messageId: string;
  data: MinimalAttachment[];
};

export default function AttachmentListView({
  messageId,
  data,
}: AttachmentListViewProps) {
  return (
    <VStack divider={<StackDivider />}>
      {data.map((attachment) => (
        <AttachmentListItem
          key={attachment.id}
          messageId={messageId}
          data={attachment}
        />
      ))}
    </VStack>
  );
}
