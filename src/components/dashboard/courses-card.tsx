import { useCurrentPeriod } from "@/api/user/use-current-period";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image, { StaticImageData } from "next/image";
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
          <Link
            as={NextLink}
            variant="button"
            href={routes.ADD_COURSES}
          >
            Register Courses
          </Link>
        )}
      </Flex>
    );
  } else {
    content = (
      <SimpleGrid gap={4} columns={[1, null, 3]}>
        {courses.map((course) => (
          <CourseItem
            key={course.id}
            courseId={course.id}
            code={course.code}
            title={course.title}
            image={getAbstractImage(course.id)}
          />
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
  courseId: string;
  code: string;
  title: string;
  image: string | StaticImageData;
};

const CourseItem: FC<CourseItemProps> = ({ courseId, code, title, image }) => {
  return (
    <Box pos="relative" rounded="md" overflow="hidden">
      <Box pos="absolute" w="full" h="full">
        <Image
          src={image}
          alt=""
          role="presentation"
          style={{ objectFit: "cover" }}
          fill
        />
      </Box>
      <VStack
        w="full"
        h="full"
        p={2}
        pos="relative"
        bgColor="blackAlpha.700"
        color="white"
        spacing={3}
        justify="space-between"
      >
        <Text fontWeight="bold" color="primary.400">
          {code}
        </Text>
        <Text textAlign="center" flex="1" mb={4}>
          {title}
        </Text>
        <Link
          as={NextLink}
          href={`/courses/${courseId}`}
          variant="button"
          fontSize="sm"
          w={{ base: "full", md: "auto" }}
          textAlign="center"
        >
          View Details
        </Link>
      </VStack>
    </Box>
  );
};

export default CoursesCard;
