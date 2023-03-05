import { Box, Card, CardBody, Flex, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import CourseMaterialDownload from "./course-material-download";

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
    <Card
      pos="relative"
      rounded="lg"
      overflow="hidden"
      w="full"
      _hover={{
        "& img": { filter: "auto", brightness: "60%" },
      }}
    >
      <Flex>
        <CourseMaterialDownload link={course.materialLink} />
        <Box pos="relative" w="15rem" h="15rem">
          <Image
            alt="Some image"
            src={course.image}
            style={{ objectFit: "cover" }}
            fill
          />
        </Box>
        <CardBody ml={3}>
          <Flex direction="column" align="flex-start">
            <Text fontSize="sm" fontWeight="bold">
              {course.id}
            </Text>
            <Text fontSize="2xl" fontWeight="semibold">
              {course.title}
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="blackAlpha.700">
              {course.lecturer}
            </Text>
            <Text my={2} noOfLines={3}>
              {course.description}
            </Text>
            <Text mt={2} fontSize="sm" fontWeight="semibold">
              {course.semester == 1 ? "First Semester" : "Second Semester"}
            </Text>
            <Text fontSize="sm">
              {course.status} - {course.units}{" "}
              {course.units > 1 ? "units" : "unit"}
            </Text>
          </Flex>
        </CardBody>
      </Flex>
    </Card>
  );
};
