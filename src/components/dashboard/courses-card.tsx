import { useSchoolPeriod } from "@/api/user/use-current-period";
import { webinarQueries } from "@/api/webinar.queries";
import {
  AspectRatio,
  Badge,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Skeleton,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import isPast from "date-fns/isPast";
import Image from "next/image";
import NextLink from "next/link";
import { FC } from "react";
import { courseQueries } from "../../api/course.queries";
import { dashboardQueries } from "../../api/dashboard.queries";
import * as routes from "../../constants/routes";
import getAbstractImage from "../../lib/get-abstract-image";

const CoursesCard: FC = () => {
  const { period } = useSchoolPeriod();
  const { data: dashboardInfo, isLoading } = useQuery(
    dashboardQueries.dashboardInfo()
  );
  const { data: canAddCourses } = useQuery(
    courseQueries.registrationOpenBy(period.semester.id)
  );
  const courses = dashboardInfo?.courses || [];

  let content;

  if (isLoading) {
    content = (
      <SimpleGrid gap={4} columns={[2, null, null, 4]}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton h={28} key={i} />
        ))}
      </SimpleGrid>
    );
  } else if (courses.length === 0) {
    content = (
      <Flex direction="column" align="center" justify="center" gap={8} py={8}>
        <Text>You have not registered for any course.</Text>
        {canAddCourses && (
          <Link as={NextLink} variant="button" href={routes.ADD_COURSES}>
            Register Courses
          </Link>
        )}
      </Flex>
    );
  } else {
    content = (
      <SimpleGrid gap={4} columns={[1, null, 3]}>
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Card mt={8} mb={4}>
      <CardHeader
        display="flex"
        justifyContent="space-between"
        data-tour-id="course-list"
      >
        <Heading as="h2" fontSize="md">
          Courses
        </Heading>
      </CardHeader>
      <CardBody>{content}</CardBody>
    </Card>
  );
};

type CourseItemProps = {
  course: Course;
};

const CourseItem: FC<CourseItemProps> = ({ course }) => {
  const { period } = useSchoolPeriod();
  const currentSessionId = period.session.id;
  const { data: webinars } = useQuery({
    ...webinarQueries.listBy(currentSessionId, course.id),
    enabled: !!currentSessionId,
  });
  const earliestWebinar = webinars?.[webinars.length - 1];
  const liveWebinar = webinars?.find((w) => w.status === "started");

  return (
    <Card
      rounded="lg"
      overflow="hidden"
      _hover={{
        "& img": { filter: "auto", brightness: "60%" },
      }}
      data-tour-id={`course-card-${course.id}`}
    >
      <AspectRatio pos="relative" w="full" ratio={3 / 2} overflow="hidden">
        <div>
          <Image
            alt=""
            src={getAbstractImage(course.id)}
            style={{ objectFit: "cover" }}
            fill
          />
          {liveWebinar && (
            <Tooltip
              label="Click to join the live webinar"
              placement="top"
              hasArrow
            >
              <Badge
                as={NextLink}
                href={routes.WEBINAR_DETAIL.replace(
                  "[courseId]",
                  course.id
                ).replace("[webinarId]", liveWebinar.id)}
                position="absolute"
                bottom={2}
                right={2}
                colorScheme={"red"}
                variant={"solid"}
                animation="pulse-bg 1.2s infinite"
                sx={{
                  "@keyframes pulse-bg": {
                    "0%": { backgroundColor: "red.500" },
                    "50%": { backgroundColor: "red.300" },
                    "100%": { backgroundColor: "red.500" },
                  },
                }}
              >
                Live Webinar
              </Badge>
            </Tooltip>
          )}
        </div>
      </AspectRatio>
      <CardBody p={5} display="flex">
        <Flex direction="column" align="flex-start">
          <Text fontSize="sm" fontWeight="bold">
            {course.code}
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" textOverflow="ellipsis">
            {course.title}
          </Text>
          <Text fontSize="sm" fontWeight="bold" color="blackAlpha.700" minH={6}>
            {course.lecturer}
          </Text>
          <Text my={2} noOfLines={3} minH={16} title={course.description}>
            {course.description}
          </Text>
          <Spacer />
          {earliestWebinar && (
            <Text fontSize="sm" color="blackAlpha.700">
              {isPast(earliestWebinar.scheduledFor) ? "Started" : "Begins"}{" "}
              {new Intl.DateTimeFormat("en-NG", {
                dateStyle: "full",
                timeStyle: "short",
                hour12: true,
              }).format(earliestWebinar.scheduledFor)}
            </Text>
          )}
          <Link
            mt={4}
            as={NextLink}
            variant="button"
            href={routes.COURSE_DETAIL.replace("[courseId]", course.id)}
          >
            Enter Virtual Class
          </Link>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default CoursesCard;
