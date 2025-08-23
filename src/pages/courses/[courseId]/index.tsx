import { useCurrentPeriod } from "@/api/user/use-current-period";
import CourseWebinarView from "@/components/courses/course-webinar-view";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Icon,
  Link,
  SimpleGrid,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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
  const { courseId } = router.query;
  const { period } = useCurrentPeriod();
  const currentSessionId = period.session.id;

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
        <PageTitle showBackButton>Loading...</PageTitle>
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" />
        </Flex>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Seo title="Course Page" />
        <PageTitle showBackButton>Course Page</PageTitle>
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
        <PageTitle showBackButton>Course Page</PageTitle>
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
      <PageTitle showBackButton>
        {course.code}: {course.title}
      </PageTitle>

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
                  <Text fontSize="sm">{course.lecturer || "N/A"}</Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Icon as={IoBookOutline} color="primary.500" />
                  <Text fontSize="sm">{course.units} Units</Text>
                </Flex>
                <Flex align="center" gap={2}>
                  <Icon as={IoDocumentOutline} color="primary.500" />
                  <Text fontSize="sm">{statusCodeToName(course.status)}</Text>
                </Flex>
              </SimpleGrid>
              {course.materialLink && (
                <Link
                  variant="button"
                  href={course.materialLink}
                  mt={2}
                  py={2}
                  px={3}
                  lineHeight={0}
                  display="inline-flex"
                  w="fit-content"
                  gap={2}
                  alignItems="center"
                  isExternal
                >
                  <Icon
                    aria-label="Download course material"
                    role="presentation"
                    as={IoDownloadOutline}
                    fontSize={"1.8rem"}
                  />
                  <Text as="span">Download Course Material</Text>
                </Link>
              )}
            </VStack>
          </Flex>
        </CardBody>
      </Card>

      {/* Course Content Tabs */}
      <Tabs colorScheme="primary" variant="soft-rounded">
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
