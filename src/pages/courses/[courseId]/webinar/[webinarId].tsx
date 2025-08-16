import { courseQueries } from "@/api/course.queries";
import { webinars } from "@/components/courses/course-webinar-view";
import {
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
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  IoCalendarOutline,
  IoCloudDownloadOutline,
  IoLinkOutline,
  IoPlayCircleOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import PageTitle from "../../../../components/common/page-title";
import Seo from "../../../../components/common/seo";

const webinar = webinars[0];

const WebinarDetail: FC = () => {
  const router = useRouter();
  const { courseId /* webinarId */ } = router.query;

  const {
    data: course,
    isLoading: courseIsLoading,
    error: courseError,
  } = useQuery({
    ...courseQueries.detailsBy(courseId as string),
  });

  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

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

  if (courseIsLoading) {
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

  if (courseError || !course || !webinar) {
    return (
      <>
        <Seo title="Webinar Not Found" />
        <PageTitle showBackButton>Webinar Not Found</PageTitle>
        <Card>
          <CardBody>
            <Text color="red.500" textAlign="center">
              {courseError?.message || "Webinar not found"}
            </Text>
          </CardBody>
        </Card>
      </>
    );
  }

  return (
    <>
      <Seo title={`Webinar - ${course.title}`} />
      <PageTitle showBackButton>{course.code} - Webinar Details</PageTitle>

      {/* Webinar Header */}
      <Card mb={6}>
        <CardBody>
          <VStack align="stretch" spacing={4}>
            <Flex align="center" gap={3}>
              <Icon as={IoVideocamOutline} boxSize={8} color="blue.500" />
              <Box>
                <Heading size="lg">Introduction to {course.title}</Heading>
                <Text color="gray.600">{course.code}</Text>
              </Box>
            </Flex>

            <Flex align="center" gap={2}>
              <Icon as={IoCalendarOutline} color="gray.500" />
              <Text fontSize="sm" fontWeight="semibold">
                {formatDate(webinar.scheduledAt)}
              </Text>
            </Flex>

            <Text color="gray.600" lineHeight="tall">
              Opening webinar covering course overview and expectations. This
              session will introduce key concepts and provide guidance for the
              semester.
            </Text>
          </VStack>
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
              as={Link}
              href={webinar.joinUrl || "#"}
              isDisabled={!webinar.joinUrl}
              isExternal
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
                      href={recording.downloadUrl}
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
