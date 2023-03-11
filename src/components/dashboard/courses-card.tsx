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
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { FC } from "react";
import * as routes from "../../constants/routes";
import { useDashboardInfo } from "../../hooks/dashboard/use-dashboard-info";
import getAbstractImage from "../../lib/get-abstract-image";

const CoursesCard: FC = () => {
  const dashboardInfo = useDashboardInfo();
  const courses = dashboardInfo.data?.courses || [];

  let content;

  if (dashboardInfo.isInitialLoading) {
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
        <Link as={NextLink} variant="button" href={routes.ADD_COURSES}>
          Register Courses
        </Link>
      </Flex>
    );
  } else {
    content = (
      <SimpleGrid gap={4} columns={[2, null, null, 4]}>
        {courses.slice(0, 4).map((course) => (
          <CourseItem
            key={course.id}
            code={course.id}
            title={course.title}
            units={course.units}
            image={course.image}
          />
        ))}
      </SimpleGrid>
    );
  }

  return (
    <Card mt={8}>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading as="h2" fontSize="md">
          Courses
        </Heading>
        {courses.length > 0 && (
          <Text as="span">
            <Link as={NextLink} href={routes.REGISTERED_COURSES}>
              See other courses &rarr;
            </Link>
          </Text>
        )}
      </CardHeader>
      <CardBody>{content}</CardBody>
    </Card>
  );
};

type CourseItemProps = {
  code: string;
  title: string;
  units: number;
  image?: string;
};

const CourseItem: FC<CourseItemProps> = ({ code, title, units, image }) => {
  return (
    <Box pos="relative" rounded="md" overflow="hidden">
      <Box pos="absolute" w="full" h="full">
        <Image src={getAbstractImage()} alt="" role="presentation" fill />
      </Box>
      <VStack
        w="full"
        h="full"
        p={2}
        pos="relative"
        bgColor="blackAlpha.700"
        color="white"
      >
        <Text fontWeight="bold" color="primary.400">
          {code}
        </Text>
        <Text textAlign="center">{title}</Text>
        <Spacer />
        <Text fontSize="sm">{units} Units</Text>
      </VStack>
    </Box>
  );
};

export default CoursesCard;
