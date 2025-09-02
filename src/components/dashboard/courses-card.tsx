import { useCurrentPeriod } from "@/api/user/use-current-period";
import { webinarQueries } from "@/api/webinar.queries";
import {
  AspectRatio,
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
  const { period } = useCurrentPeriod();
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
      <CardHeader display="flex" justifyContent="space-between">
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
  const { period } = useCurrentPeriod();
  const currentSessionId = period.session.id;
  const { data: earliestWebinar } = useQuery({
    ...webinarQueries.listBy(currentSessionId, course.id),
    select: (data) => data?.[data.length - 1],
  });

  return (
    <Card
      rounded="lg"
      overflow="hidden"
      _hover={{
        "& img": { filter: "auto", brightness: "60%" },
      }}
    >
      <AspectRatio pos="relative" w="full" ratio={3 / 2} overflow="hidden">
        <div>
          <Image
            alt=""
            src={getAbstractImage(course.id)}
            style={{ objectFit: "cover" }}
            fill
          />
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
              {earliestWebinar.scheduledFor.toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
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
