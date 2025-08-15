import {
  Box,
  Card,
  CardBody,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import * as routes from "../../constants/routes";
import getAbstractImage from "../../lib/get-abstract-image";
import statusCodeToName from "../../lib/status-code-to-name";

type CourseListViewProps = {
  courseList: Course[];
};

const CourseListView: FC<CourseListViewProps> = ({ courseList }) => {
  return (
    <VStack spacing={8}>
      {courseList.map((course) => (
        <CourseListViewItem key={course.id} course={course} />
      ))}
    </VStack>
  );
};

export default CourseListView;

type CourseListViewItemProps = {
  course: Course;
};

const CourseListViewItem: FC<CourseListViewItemProps> = ({ course }) => {
  return (
    <LinkBox
      as={Card}
      pos="relative"
      rounded="lg"
      overflow="hidden"
      w="full"
      textDecoration="none"
      _hover={{
        "& img": { filter: "auto", brightness: "60%" },
        transform: "translateY(-2px)",
        boxShadow: "lg",
        textDecoration: "none",
      }}
      transition="all 0.2s"
      title="Click to view course page"
    >
      <Flex>
        <Box pos="relative" w={["120px", null, "200px"]} flexShrink={0}>
          <Image
            src={getAbstractImage(course.id)}
            alt=""
            role="presentation"
            style={{ objectFit: "cover" }}
            fill
          />
        </Box>
        <CardBody>
          <Flex direction="column" justify="space-between" h="full" gap={4}>
            <Box>
              <Text fontSize="sm" color="gray.500" fontWeight="semibold" mb={2}>
                {course.code}
              </Text>
              <LinkOverlay
                as={Link}
                href={routes.COURSE_DETAIL.replace("[courseId]", course.id)}
              >
                <Text
                  fontWeight="bold"
                  fontSize="lg"
                  mb={2}
                  lineHeight="shorter"
                >
                  {course.title}
                </Text>
              </LinkOverlay>
              {course.lecturer && (
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Instructor: {course.lecturer}
                </Text>
              )}
              {course.description && (
                <Text fontSize="sm" color="gray.600" noOfLines={2}>
                  {course.description}
                </Text>
              )}
            </Box>
            <Flex justify="space-between" align="center">
              <Text fontSize="sm" color="gray.500">
                {course.units} Unit{course.units > 1 && "s"}
              </Text>
              <Text fontSize="sm" color="green.500" fontWeight="semibold">
                {statusCodeToName(course.status)}
              </Text>
            </Flex>
          </Flex>
        </CardBody>
      </Flex>
    </LinkBox>
  );
};
