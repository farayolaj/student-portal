import { useDocumentTypes } from "@/api/verify-result/use-document-types";
import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Select,
  Icon,
  Input,
  CloseButton,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IoCloudUpload } from "react-icons/io5";

type DocumentUploadProps = {
  value: DocumentUploadValue;
  onChange?: (newValue: DocumentUploadValue) => void;
  onRemove?: () => void;
  showRemoveButton?: boolean;
  isDisabled?: boolean;
};

export default function DocumentUpload({
  value,
  onChange = (_value) => {},
  onRemove = () => {},
  showRemoveButton = true,
  isDisabled,
}: DocumentUploadProps) {
  const documentTypesRes = useDocumentTypes();

  useEffect(() => {
    if (!Boolean(value.documentTypeId) && documentTypesRes.data) {
      onChange({ ...value, documentTypeId: documentTypesRes.data[0].id });
    }
  }, [documentTypesRes.data, onChange, value]);

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
        <Select
          onChange={(ev) =>
            onChange({ ...value, documentTypeId: ev.target.value as any })
          }
          value={value.documentTypeId}
          disabled={isDisabled}
        >
          {documentTypesRes.data?.map((docType) => (
            <option key={docType.id} value={docType.id}>
              {docType.name}
            </option>
          ))}
          <option value="others">Others</option>
        </Select>
      </FormControl>
      {!isDisabled && (
        <FormControl alignSelf="center">
          <FormLabel
            lineHeight="1"
            borderRadius="md"
            fontWeight="semibold"
            transitionProperty="common"
            transitionDuration="normal"
            paddingInline={4}
            bg="primary.500"
            color="white"
            cursor="pointer"
            w="fit-content"
            py={3}
            display="inline-flex"
            alignItems="center"
          >
            <Icon as={IoCloudUpload} mr={2} boxSize={5} />
            Upload Document (Image or PDF)
          </FormLabel>
          <Input
            srOnly
            type="file"
            accept="image/*, .pdf"
            variant="unstyled"
            onChange={(ev) => {
              const file = ev.target.files ? ev.target.files.item(0) : null;
              onChange({ ...value, file });
            }}
          />
          {value.file && <Text>{value.file.name}</Text>}
        </FormControl>
      )}
      {value.documentTypeId === "others" && (
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            value={value.customTitle}
            onChange={(ev) =>
              onChange({ ...value, customTitle: ev.target.value })
            }
          />
        </FormControl>
      )}
      <CloseButton
        pos="absolute"
        top={0}
        right={0}
        colorScheme="red"
        hidden={!showRemoveButton}
        onClick={onRemove}
      />
    </SimpleGrid>
  );
}
