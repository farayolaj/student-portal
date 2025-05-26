import { FormControl, FormLabel, Input, SimpleGrid } from "@chakra-ui/react";

type ReadonlyDocumentUploadProps = {
  value: DocumentUpload;
};

export default function ReadonlyDocumentUpload({
  value,
}: ReadonlyDocumentUploadProps) {
  return (
    <SimpleGrid
      columnGap={16}
      rowGap={4}
      columns={[1, null, 2]}
      w="full"
      pos="relative"
    >
      <FormControl>
        <FormLabel>Document Title</FormLabel>
        <Input value={value.documentType} isReadOnly />
      </FormControl>
      {value.customTitle && (
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input value={value.customTitle} isReadOnly />
        </FormControl>
      )}
    </SimpleGrid>
  );
}
