import { webinarQueries } from "@/api/webinar.queries";
import { useJoinCall } from "@/api/webinar/use-join-call";
import WebinarComments from "@/components/courses/webinars/webinar-comments";
import WebinarRecordings from "@/components/courses/webinars/webinar-recordings";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Link,
  Skeleton,
  Spinner,
  Switch,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import {
  IoCalendarOutline,
  IoDownloadOutline,
  IoLinkOutline,
} from "react-icons/io5";
import PageTitle from "../../../../components/common/page-title";
import Seo from "../../../../components/common/seo";
import mobileClassWebinarIcon from "../../../../icons/mobile-class-webinar.png";

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
};

const WebinarDetail: FC = () => {
  const router = useRouter();
  const { webinarId, commentsOnly: commentsOnlyParam } = router.query;

  // Initialize commentsOnly state from URL parameter
  const [commentsOnly, setCommentsOnly] = useState(() => {
    return commentsOnlyParam === "true";
  });

  // Update commentsOnly state when URL parameter changes
  React.useEffect(() => {
    setCommentsOnly(commentsOnlyParam === "true");
  }, [commentsOnlyParam]);

  // Function to handle toggle and update URL
  const handleCommentsOnlyToggle = (checked: boolean) => {
    setCommentsOnly(checked);

    const newQuery = { ...router.query };
    if (checked) {
      newQuery.commentsOnly = "true";
    } else {
      delete newQuery.commentsOnly;
    }

    router.replace(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  const {
    data: webinar,
    isLoading,
    error,
  } = useQuery(webinarQueries.detailsBy(webinarId as string));

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
              {/* Replace icon with image */}
              <Box boxSize={8} pos={"relative"}>
                <Image
                  src={mobileClassWebinarIcon.src}
                  alt="Webinar"
                  objectFit="contain"
                  fill
                />
              </Box>
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

      {/* Content Section */}
      <Card mb={6}>
        <CardBody>
          <Flex justify="space-between" align="center" mb={6}>
            <Flex align="center" gap={2}>
              <Heading size="md">Webinar Content</Heading>
            </Flex>
            <Flex align="center" gap={3}>
              <Text fontSize="sm" fontWeight="medium">
                Show Comments Only
              </Text>
              <Switch
                colorScheme="primary"
                isChecked={commentsOnly}
                onChange={(e) => handleCommentsOnlyToggle(e.target.checked)}
              />
            </Flex>
          </Flex>

          <VStack spacing={12} align="stretch">
            {/* Recordings Section - Hidden when comments only is enabled */}
            {!commentsOnly && (
              <WebinarRecordings recordings={webinar.recordings} />
            )}

            {/* Comments Section */}
            <WebinarComments webinar={webinar} />
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

export default WebinarDetail;
