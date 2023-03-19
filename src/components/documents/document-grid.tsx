import {
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  Link,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import {
  BsFillFileEarmarkPdfFill,
  BsFillFileEarmarkTextFill,
  BsFillFileEarmarkWordFill,
} from "react-icons/bs";
import { IoDownloadOutline } from "react-icons/io5";
import { useFetchDocument } from "@/api/document/use-fetch-document";

type DocumentGridProps = {
  documents: PortalDocument[];
};

export default function DocumentGrid({ documents }: DocumentGridProps) {
  return (
    <SimpleGrid columns={[1, null, 3]} gap={8}>
      {documents.map((document) => (
        <DocumentItem key={document.id} document={document} />
      ))}
    </SimpleGrid>
  );
}

type DocumentItemProps = {
  document: PortalDocument;
};

function DocumentItem({ document }: DocumentItemProps) {
  const toast = useToast();
  const { intiateFetch, isLoading } = useFetchDocument({
    url: document.url,
    onError: (error) => {
      toast({
        title: error.message,
        description: `${document.title} could not be downloaded. Please try again later.`,
        status: "error",
        isClosable: true,
      });
    },
  });

  let icon: IconType;

  switch (document.fileType) {
    case "pdf":
      icon = BsFillFileEarmarkPdfFill;
      break;
    case "docx":
    case "doc":
      icon = BsFillFileEarmarkWordFill;
      break;
    default:
      icon = BsFillFileEarmarkTextFill;
  }

  const descriptionArr = [];

  if (document.session) descriptionArr.push(document.session);
  if (document.programme) descriptionArr.push(document.programme);
  if (document.semester) descriptionArr.push(document.semester);

  const description = descriptionArr.join(" - ");

  return (
    <Card>
      <Flex justify="center" align="center" p={6} color="primary.500">
        <Icon fontSize="5rem" as={icon} />
      </Flex>
      <CardBody>
        <Flex direction="column" gap={2}>
          <Text h={12}>{document.title}</Text>
          <Text
            fontSize="xs"
            minH={10}
            fontWeight="bold"
            textTransform="uppercase"
          >
            {description}
          </Text>
          <Button
            display="inline-flex"
            alignItems="center"
            gap={3}
            mt={4}
            w="fit-content"
            mx="auto"
            onClick={() => intiateFetch()}
            isDisabled={isLoading}
          >
            {isLoading ? (
              <Spinner size="xs" color="white" />
            ) : (
              <Icon fontSize="1.5rem" as={IoDownloadOutline} />
            )}
            Download
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}
