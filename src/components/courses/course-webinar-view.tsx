import { logPlayback as logPlaybackFn } from "@/api/webinar.mutations";
import { webinarQueries } from "@/api/webinar.queries";
import { useJoinCall } from "@/api/webinar/use-join-call";
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
  SimpleGrid,
  Spinner,
  Text,
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { FC } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import * as routes from "../../constants/routes";

type CourseWebinarViewProps = {
  sessionId: string;
  courseId: string;
};

const CourseWebinarView: FC<CourseWebinarViewProps> = ({
  courseId,
  sessionId,
}) => {
  const {
    data: webinars = [],
    isLoading,
    error,
  } = useQuery(webinarQueries.listBy(sessionId, courseId));

  if (isLoading) {
    return (
      <Card>
        <CardBody py={8} display={"flex"} justifyContent={"center"}>
          <Spinner />
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardBody py={8}>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error Loading Webinars</AlertTitle>
            <AlertDescription>
              {error.message ||
                "There was an error loading the webinars. Please, try again later."}
            </AlertDescription>
          </Alert>
        </CardBody>
      </Card>
    );
  }

  if (webinars.length === 0) {
    return (
      <Card>
        <CardBody>
          <Text color="gray.500" textAlign="center" py={8}>
            No webinar available for this course yet.
          </Text>
        </CardBody>
      </Card>
    );
  }

  return (
    <SimpleGrid columns={[1, null, 3]} spacing={4}>
      {webinars
        .sort((a, b) => b.scheduledFor.getTime() - a.scheduledFor.getTime())
        .map((webinar) => (
          <WebinarCard key={webinar.id} webinar={webinar} courseId={courseId} />
        ))}
    </SimpleGrid>
  );
};

export default CourseWebinarView;

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

type WebinarCardProps = {
  webinar: Webinar;
  courseId: string;
};

const WebinarCard: FC<WebinarCardProps> = ({ webinar, courseId }) => {
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

  return (
    <Card>
      <CardBody>
        <Flex justify="space-between" align="flex-start" mb={4}>
          <Flex gap={3}>
            <Box>
              <Flex align="center" gap={2} mb={2}>
                <Heading size="sm">{webinar.title}</Heading>
                {webinar.status === "started" && (
                  <Badge colorScheme="red" variant={"solid"}>
                    Live
                  </Badge>
                )}
              </Flex>

              <VStack align="flex-start" spacing={1}>
                <Flex align="center" gap={2}>
                  <Icon as={IoCalendarOutline} boxSize={4} color="gray.500" />
                  <Text fontSize="sm" color="gray.600">
                    {formatDate(webinar.scheduledFor)}
                  </Text>
                </Flex>
              </VStack>
            </Box>
          </Flex>
        </Flex>

        <Flex justify="space-between">
          <Button
            as={NextLink}
            href={routes.WEBINAR_DETAIL.replace("[courseId]", courseId).replace(
              "[webinarId]",
              webinar.id
            )}
            size="sm"
            variant="outline"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            View Room
          </Button>
          {webinar.status === "ended" ? (
            <Tooltip
              label={"The recording is not yet available, check back again."}
              isDisabled={!!webinar.recordingUrl}
              hasArrow
              placement="top"
            >
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => {
                  logPlayback(webinar.id);
                  window.open(webinar.recordingUrl!, "_blank");
                }}
                isDisabled={!webinar.recordingUrl}
              >
                Playback
              </Button>
            </Tooltip>
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
                size="sm"
                onClick={() => joinCall.join(webinar.id)}
                isDisabled={joinCall.isJoining || webinar.status === "upcoming"}
                isLoading={joinCall.isJoining}
              >
                Join Webinar
              </Button>
            </Tooltip>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};
