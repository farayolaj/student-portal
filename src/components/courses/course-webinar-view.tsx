import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import * as routes from "../../constants/routes";

type CourseWebinarViewProps = {
  courseId: string;
};

export const webinars: Webinar[] = [
  {
    id: "webinar-1",
    title: "Introduction to This Course",
    scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    presentation: "#",
    isLive: false,
    joinUrl: "#",
    recordings: [
      {
        id: "recording-1",
        downloadUrl: "#",
        recordedAt: new Date("2025-01-01T10:00:00Z"),
        duration: 100,
      },
      {
        id: "recording-2",
        downloadUrl: "#",
        recordedAt: new Date("2025-01-02T10:00:00Z"),
        duration: 40,
      },
    ],
  },
];

const CourseWebinarView: FC<CourseWebinarViewProps> = ({ courseId }) => {
  if (webinars.length === 0) {
    return (
      <Card>
        <CardBody>
          <Text color="gray.500" textAlign="center" py={8}>
            No activities available for this course yet.
          </Text>
        </CardBody>
      </Card>
    );
  }

  return (
    <SimpleGrid columns={[1, null, 3]} spacing={4}>
      {webinars
        .sort((a, b) => b.scheduledAt.getTime() - a.scheduledAt.getTime())
        .map((activity) => (
          <WebinarCard
            key={activity.id}
            webinar={activity}
            courseId={courseId}
          />
        ))}
    </SimpleGrid>
  );
};

export default CourseWebinarView;

type WebinarCardProps = {
  webinar: Webinar;
  courseId: string;
};

const WebinarCard: FC<WebinarCardProps> = ({ webinar, courseId }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  };

  return (
    <Card>
      <CardBody>
        <Flex justify="space-between" align="flex-start" mb={4}>
          <Flex gap={3}>
            <Box>
              <Flex align="center" gap={2} mb={2}>
                <Heading size="sm">{webinar.title}</Heading>
              </Flex>

              <VStack align="flex-start" spacing={1}>
                <Flex align="center" gap={2}>
                  <Icon as={IoCalendarOutline} boxSize={4} color="gray.500" />
                  <Text fontSize="sm" color="gray.600">
                    {formatDate(webinar.scheduledAt)}
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
            View Details
          </Button>
          {webinar.joinUrl && (
            <Button
              as={Link}
              href={webinar.joinUrl}
              size="sm"
              _hover={{ textDecoration: "none" }}
            >
              Join Webinar
            </Button>
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};
