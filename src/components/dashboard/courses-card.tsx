import {
  Box,
  Card,
  CardBody,
  CardHeader,
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
import randomImage from "../courses/randomImage";

type CoursesCardProps = {
  courses: Course[];
};

const CoursesCard: FC<CoursesCardProps> = ({ courses }) => {
  return (
    <Card mt={8}>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading as="h2" fontSize="md">
          Courses
        </Heading>
        <Text as="span">
          <Link as={NextLink} href={routes.REGISTERED_COURSES}>
            See other courses &rarr;
          </Link>
        </Text>
      </CardHeader>
      <CardBody>
        <SimpleGrid gap={4} columns={[2, null, null, 4]}>
          {courses.length > 0
            ? courses
                .slice(0, 4)
                .map((course) => (
                  <CourseItem
                    key={course.id}
                    code={course.id}
                    title={course.title}
                    units={course.units}
                    image={course.image}
                  />
                ))
            : [1, 2, 3, 4].map((i) => <Skeleton h={28} key={i} />)}
        </SimpleGrid>
      </CardBody>
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
        <Image src={randomImage()} alt="" role="presentation" fill />
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
