import {
  Card,
  CardBody,
  Flex,
  Icon,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
  BsFillFileEarmarkPdfFill,
  BsFillFileEarmarkTextFill,
  BsFillFileEarmarkWordFill,
} from "react-icons/bs";
import { IoDownloadOutline } from "react-icons/io5";

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
          <Text>{document.title}</Text>
          <Text
            fontSize="xs"
            minH={10}
            fontWeight="bold"
            textTransform="uppercase"
          >
            {description}
          </Text>
          <Link
            variant="button"
            href={document.url}
            display="inline-flex"
            gap={3}
            mt={4}
            w="fit-content"
            mx="auto"
            download={document.title}
          >
            <Icon fontSize="1.5rem" as={IoDownloadOutline} />
            Download
          </Link>
        </Flex>
      </CardBody>
    </Card>
  );
}
