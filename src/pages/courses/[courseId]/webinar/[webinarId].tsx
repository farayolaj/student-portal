import { logPlayback as logPlaybackFn } from "@/api/webinar.mutations";
import { webinarQueries } from "@/api/webinar.queries";
import { useJoinCall } from "@/api/webinar/use-join-call";
import WebinarComments from "@/components/courses/webinars/webinar-comments";
import { formatDate } from "@/utils/webinar";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Spinner,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  IoCalendarOutline,
  IoChevronDown,
  IoDownloadOutline,
  IoLinkOutline,
} from "react-icons/io5";
import PageTitle from "../../../../components/common/page-title";
import Seo from "../../../../components/common/seo";
import mobileClassWebinarIcon from "../../../../icons/mobile-class-webinar.png";

const WebinarDetail: FC = () => {
  const router = useRouter();
  const { webinarId } = router.query;

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
  const { mutate: logPlayback } = useMutation({
    mutationFn: logPlaybackFn,
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
              <Box boxSize={8} pos={"relative"}>
                <Image
                  src={mobileClassWebinarIcon.src}
                  alt="Webinar"
                  objectFit="contain"
                  fill
                />
              </Box>
              <Box>
                <Heading size="lg" display="inline">
                  {webinar.title}
                </Heading>
                {webinar.status === "started" && (
                  <Badge ms={3} colorScheme="red" variant={"solid"}>
                    Live
                  </Badge>
                )}
                {webinar.status === "ended" && (
                  <Badge ms={3} colorScheme="gray" variant={"solid"}>
                    Ended
                  </Badge>
                )}
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
            {webinar.status === "ended" ? (
              webinar.recordings.length === 0 ? (
                <Tooltip
                  label={
                    "The recording is not yet available, check back again."
                  }
                  hasArrow
                  placement="top"
                >
                  <Button
                    leftIcon={<Icon as={IoLinkOutline} />}
                    colorScheme="blue"
                    size="lg"
                    isDisabled
                  >
                    Playback
                  </Button>
                </Tooltip>
              ) : webinar.recordings.length === 1 ? (
                <Button
                  leftIcon={<Icon as={IoLinkOutline} />}
                  colorScheme="blue"
                  size="lg"
                  onClick={() => {
                    logPlayback(webinar.id);
                    window.open(webinar.recordings[0].url, "_blank");
                  }}
                >
                  Playback
                </Button>
              ) : (
                <Menu>
                  <MenuButton
                    as={Button}
                    leftIcon={<Icon as={IoLinkOutline} />}
                    rightIcon={<IoChevronDown />}
                    colorScheme="blue"
                    size="lg"
                  >
                    Playback
                  </MenuButton>
                  <MenuList>
                    {webinar.recordings
                      .sort((a, b) => b.date.getTime() - a.date.getTime())
                      .map((recording, index) => (
                        <MenuItem
                          key={recording.id}
                          onClick={() => {
                            logPlayback(webinar.id);
                            window.open(recording.url, "_blank");
                          }}
                        >
                          Recording {index + 1} - {formatDate(recording.date)}
                        </MenuItem>
                      ))}
                  </MenuList>
                </Menu>
              )
            ) : (
              <Tooltip
                label={`Webinar will start on ${formatDate(
                  webinar.scheduledFor
                )}.`}
                isDisabled={
                  webinar.status === "started" ||
                  webinar.status === "pending-start"
                }
                hasArrow
                placement="top"
              >
                <Button
                  leftIcon={<Icon as={IoLinkOutline} />}
                  size="lg"
                  onClick={() => joinCall.join(webinar.id)}
                  isDisabled={
                    joinCall.isJoining || webinar.status === "upcoming"
                  }
                  isLoading={joinCall.isJoining}
                >
                  Join Webinar
                </Button>
              </Tooltip>
            )}
          </VStack>
        </CardBody>
      </Card>

      {/* Content Section */}
      <Card mb={6}>
        <CardBody>
          <WebinarComments webinar={webinar} />
        </CardBody>
      </Card>
    </>
  );
};

export default WebinarDetail;
