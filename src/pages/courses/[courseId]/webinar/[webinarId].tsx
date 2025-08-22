import { webinarQueries } from "@/api/webinar.queries";
import { useJoinCall } from "@/api/webinar/use-join-call";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Skeleton,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  IoCalendarOutline,
  IoCloudDownloadOutline,
  IoDownloadOutline,
  IoLinkOutline,
  IoPlayCircleOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import PageTitle from "../../../../components/common/page-title";
import Seo from "../../../../components/common/seo";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

const WebinarDetail: FC = () => {
  const router = useRouter();
  const { webinarId } = router.query;

  const {
    data: webinar,
    isLoading,
    error,
  } = useQuery(webinarQueries.detailsBy(webinarId as string));

  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const toast = useToast();
  const joinCall = useJoinCall({
    onError: (error) => {
      toast({
        title: "Error Joining Webinar",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  if (isLoading) {
    return (
      <>
        <Seo title="Loading Webinar..." />
        <PageTitle showBackButton>
          <Skeleton w="40rem" h="22px" />
        </PageTitle>
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" />
        </Flex>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Seo title="Webinar" />
        <PageTitle showBackButton>Webinar Details</PageTitle>
        <Card>
          <CardBody>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error Loading Webinar</AlertTitle>
              <AlertDescription>
                {error.message ||
                  "There was an error loading the webinar details. Please, try again later."}
              </AlertDescription>
            </Alert>
          </CardBody>
        </Card>
      </>
    );
  }

  if (!webinar) {
    return (
      <>
        <Seo title="Webinar" />
        <PageTitle showBackButton>Webinar Details</PageTitle>
        <Card>
          <CardBody>
            <Alert status="warning">
              <AlertIcon />
              <AlertTitle>Webinar Not Found</AlertTitle>
              <AlertDescription>The webinar was not found.</AlertDescription>
            </Alert>
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <>
      <Seo title={`Webinar - ${webinar.title}`} />
      <PageTitle showBackButton>Webinar Details</PageTitle>

      {/* Webinar Header */}
      <Card mb={6}>
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Flex align="center" gap={3}>
              <Icon as={IoVideocamOutline} boxSize={8} color="blue.500" />
              <Box>
                <Heading size="lg">{webinar.title}</Heading>
              </Box>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={IoCalendarOutline} color="gray.500" />
              <Text fontSize="sm" fontWeight="semibold">
                {formatDate(webinar.scheduledFor)}
              </Text>
            </Flex>

            <Text color="gray.600" lineHeight="tall">
              {webinar.description}
            </Text>
          </VStack>
          {webinar.presentation && (
            <Box mt={8}>
              <Button
                leftIcon={<Icon as={IoDownloadOutline} />}
                size="sm"
                as={Link}
                href={webinar.presentation.url}
                download={webinar.presentation.name}
                _hover={{
                  textDecoration: "none",
                  bgColor: "primary.600",
                }}
                isExternal
              >
                Download Presentation
              </Button>
            </Box>
          )}
        </CardBody>
      </Card>

      {/* Join Webinar Section */}
      <Card mb={6} bg="blue.50" borderColor="blue.200">
        <CardBody>
          <VStack spacing={4}>
            <Button
              leftIcon={<Icon as={IoLinkOutline} />}
              colorScheme="blue"
              size="lg"
              onClick={() => joinCall.join(webinar.id)}
              isDisabled={joinCall.isJoining}
              isLoading={joinCall.isJoining}
            >
              Join Webinar
            </Button>
          </VStack>
        </CardBody>
      </Card>

      {/* Recordings */}
      <Card bg={cardBg} borderColor={borderColor}>
        <CardHeader>
          <Flex align="center" gap={2}>
            <Icon as={IoPlayCircleOutline} color="green.500" />
            <Heading size="md">Recordings</Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          {webinar.recordings.length > 0 ? (
            <VStack spacing={4} align="stretch">
              {webinar.recordings.map((recording) => (
                <Box
                  key={recording.id}
                  p={4}
                  border="1px"
                  borderColor={borderColor}
                  rounded="md"
                >
                  <Flex justify="space-between" align="center">
                    <Box>
                      <Text fontWeight="semibold">
                        {new Intl.DateTimeFormat("en-NG", {
                          dateStyle: "full",
                          timeStyle: "short",
                          hour12: true,
                        }).format(recording.recordedAt)}
                      </Text>
                      <HStack spacing={4} mt={1}>
                        <Text fontSize="sm" color="gray.600">
                          {formatDuration(recording.duration)}
                        </Text>
                        <Text fontSize="sm" color="gray.600"></Text>
                      </HStack>
                    </Box>
                    <Button
                      leftIcon={<Icon as={IoCloudDownloadOutline} />}
                      size="sm"
                      colorScheme="green"
                      variant="outline"
                      as={Link}
                      href={recording.url}
                      isExternal
                    >
                      Download
                    </Button>
                  </Flex>
                </Box>
              ))}
            </VStack>
          ) : (
            <Text color="gray.500" textAlign="center" py={8}>
              No recordings available yet.
            </Text>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default WebinarDetail;
