import {
  AspectRatio,
  Box,
  Card,
  CardBody,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import CourseMaterialDownload from "./course-material-download";

type CourseGridViewProps = {
  courseList: Course[];
};

const CourseGridView: FC<CourseGridViewProps> = ({ courseList }) => {
  return (
    <SimpleGrid columns={[1, null, 2, null, 3]} gap={8}>
      {courseList.map((course) => (
        <CourseGridViewItem key={course.id} course={course} />
      ))}
    </SimpleGrid>
  );
};

export default CourseGridView;

type CourseGridViewItemProps = {
  course: Course;
};

const CourseGridViewItem: FC<CourseGridViewItemProps> = ({ course }) => {
  return (
    <Card
      rounded="lg"
      overflow="hidden"
      _hover={{
        "& img": { filter: "auto", brightness: "60%" },
      }}
    >
      <AspectRatio pos="relative" w="full" ratio={3 / 2}>
        <div>
          <CourseMaterialDownload link={course.materialLink} />
          <Image
            alt=""
            src={course.image}
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
      </AspectRatio>
      <CardBody p={5} display="flex">
        <Flex direction="column" align="flex-start">
          <Text fontSize="sm" fontWeight="bold">
            {course.id}
          </Text>
          <Text fontSize="2xl" fontWeight="semibold" textOverflow="ellipsis">
            {course.title}
          </Text>
          <Text fontSize="sm" fontWeight="bold" color="blackAlpha.700">
            {course.lecturer}
          </Text>
          <Text my={2} noOfLines={3}>
            {course.description}
          </Text>
          <Spacer />
          <Text mt={2} fontSize="sm" fontWeight="semibold">
            {course.semester == 1 ? "First Semester" : "Second Semester"}
          </Text>
          <Text fontSize="sm">
            {course.status} - {course.units}{" "}
            {course.units > 1 ? "units" : "unit"}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};
