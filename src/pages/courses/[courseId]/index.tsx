import { useSchoolPeriod } from "@/api/user/use-current-period";
import CourseWebinarView from "@/components/courses/course-webinar-view";
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
  Icon,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  IoBookOutline,
  IoDocumentOutline,
  IoDownloadOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { courseQueries } from "../../../api/course.queries";
import PageTitle from "../../../components/common/page-title";
import Seo from "../../../components/common/seo";
import getAbstractImage from "../../../lib/get-abstract-image";
import statusCodeToName from "../../../lib/status-code-to-name";

const CourseDetail: FC = () => {
  const router = useRouter();
  const { courseId, tab } = router.query;
  const { period } = useSchoolPeriod();
  const currentSessionId = period.session.id;

  // Map tab names to indices
  const tabMap = {
    overview: 0,
    webinars: 1,
  };

  // Get current tab index from URL, default to 0
  const currentTabIndex =
    tab && typeof tab === "string" && tab in tabMap
      ? tabMap[tab as keyof typeof tabMap]
      : 0;

  // Handle tab change and update URL
  const handleTabChange = (index: number) => {
    const tabName = Object.keys(tabMap)[index];
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: tabName },
      },
      undefined,
      { shallow: true }
    );
  };

  const {
    data: course,
    isLoading,
    error,
  } = useQuery({
    ...courseQueries.detailsBy(courseId as string),
  });

  if (isLoading) {
    return (
      <>
        <Seo title="Loading Course..." />
        <PageTitle showBackButton></PageTitle>

        {/* Course Header Skeleton */}
        <Card mb={6}>
          <CardBody>
            <Flex direction={["column", null, "row"]} gap={6}>
              <Skeleton
                w={["full", null, "200px"]}
                h="200px"
                flexShrink={0}
                rounded="md"
              />
              <VStack align="stretch" flex={1} spacing={4}>
                <Box>
                  <Skeleton h="8" w="60%" mb={2} />
                  <Skeleton h="6" w="40%" />
                </Box>
                <SimpleGrid columns={[2, null, 4]} gap={4}>
                  <Skeleton h="5" />
                  <Skeleton h="5" />
                  <Skeleton h="5" />
                </SimpleGrid>
                <Skeleton h="10" w="200px" rounded="md" />
              </VStack>
            </Flex>
          </CardBody>
        </Card>

        {/* Tabs Skeleton */}
        <Flex gap={4} mb={4}>
          <Skeleton h="10" w="100px" rounded="full" />
          <Skeleton h="10" w="100px" rounded="full" />
        </Flex>

        {/* Content Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton h="6" w="40%" />
          </CardHeader>
          <CardBody>
            <SkeletonText noOfLines={4} spacing="4" skeletonHeight="2" />
          </CardBody>
        </Card>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Seo title="Course Page" />
        <PageTitle showBackButton></PageTitle>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error Loading Course Page</AlertTitle>
          <AlertDescription>
            {error.message ||
              "There was an error loading the course page. Please, try again later."}
          </AlertDescription>
        </Alert>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <Seo title="Course Page" />
        <PageTitle showBackButton></PageTitle>
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>Course Not Found</AlertTitle>
          <AlertDescription>
            The course you are looking for does not exist or has been removed.
          </AlertDescription>
        </Alert>
      </>
    );
  }

  return (
    <>
      <Seo title={course.title} />
      <PageTitle showBackButton></PageTitle>

      {/* Course Header */}
      <Card mb={6}>
        <CardBody>
          <Flex direction={["column", null, "row"]} gap={6}>
            <Box pos="relative" w={["full", null, "200px"]} flexShrink={0}>
              <Image
                src={getAbstractImage(course.id)}
                alt={course.title}
                style={{ objectFit: "cover" }}
                fill
              />
            </Box>
            <VStack align="stretch" flex={1} spacing={4}>
              <Box>
                <Heading size="lg" mb={2}>
                  {course.title}
                </Heading>
                <Text color="gray.600" fontSize="lg">
                  {course.code}
                </Text>
              </Box>
              <SimpleGrid columns={[2, null, 4]} gap={4}>
                <Flex align="center" gap={2}>
                  <Icon as={IoPersonOutline} color="primary.500" />
                  <Text as="span" fontSize="sm">
                    {course.lecturer || "N/A"}
                  </Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Icon as={IoBookOutline} color="primary.500" />
                  <Text as="span" fontSize="sm">
                    {course.units} Units
                  </Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Icon as={IoDocumentOutline} color="primary.500" />
                  <Text as="span" fontSize="sm">
                    {statusCodeToName(course.status)}
                  </Text>
                </Flex>
              </SimpleGrid>
              <Flex direction={["column", "row"]} gap={2} wrap="wrap">
                <Tooltip
                  label={"Course material is unavailable at the moment."}
                  isDisabled={!!course.materialLink}
                  hasArrow
                  placement="top"
                >
                  <Button
                    onClick={() =>
                      course.materialLink &&
                      window.open(course.materialLink, "_blank")
                    }
                    variant="outline"
                    display="inline-flex"
                    gap={2}
                    alignItems="center"
                    size="sm"
                    isDisabled={!course.materialLink}
                  >
                    <Icon
                      aria-label="Download course material"
                      role="presentation"
                      as={IoDownloadOutline}
                      fontSize={"1.2em"}
                    />
                    <Text as="span">Course Material</Text>
                  </Button>
                </Tooltip>
                <Tooltip
                  label={"Course guide is unavailable at the moment."}
                  isDisabled={!!course.courseGuideUrl}
                  hasArrow
                  placement="top"
                >
                  <Button
                    onClick={() =>
                      course.courseGuideUrl &&
                      window.open(course.courseGuideUrl, "_blank")
                    }
                    variant="outline"
                    display="inline-flex"
                    gap={2}
                    alignItems="center"
                    size="sm"
                    isDisabled={!course.courseGuideUrl}
                  >
                    <Icon
                      aria-label="Download course guide"
                      role="presentation"
                      as={IoDownloadOutline}
                      fontSize={"1.2em"}
                    />
                    <Text as="span">Course Guide</Text>
                  </Button>
                </Tooltip>
              </Flex>
            </VStack>
          </Flex>
        </CardBody>
      </Card>

      {/* Course Content Tabs */}
      <Tabs
        colorScheme="primary"
        variant="soft-rounded"
        index={currentTabIndex}
        onChange={handleTabChange}
      >
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Webinars</Tab>
        </TabList>

        <TabPanels>
          {/* Overview Tab */}
          <TabPanel px={0}>
            <Card>
              <CardHeader>
                <Heading size="md">Course Overview</Heading>
              </CardHeader>
              <CardBody>
                <Text lineHeight="tall">
                  {course.description || "No course overview available."}
                </Text>
              </CardBody>
            </Card>
          </TabPanel>

          {/* Webinars Tab */}
          <TabPanel px={0}>
            <CourseWebinarView
              sessionId={currentSessionId}
              courseId={course.id}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default CourseDetail;
