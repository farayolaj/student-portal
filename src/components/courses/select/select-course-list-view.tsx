import {
  Box,
  Card,
  CardBody,
  Checkbox,
  Flex,
  Text,
  useToken,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import getAbstractImage from "../../../lib/get-abstract-image";
import statusCodeToName from "../../../lib/status-code-to-name";

type SelectCourseListViewProps = {
  courseList: Course[];
  selectedCourses: string[];
  onToggleSelection: (value: string) => void;
  colorScheme?: string;
};

const SelectCourseListView: FC<SelectCourseListViewProps> = ({
  courseList,
  selectedCourses,
  onToggleSelection,
  colorScheme,
}) => {
  return (
    <VStack spacing={8}>
      {courseList.map((course) => (
        <SelectCourseListViewItem
          key={course.id}
          course={course}
          onToggleSelection={onToggleSelection}
          isChecked={selectedCourses.includes(course.id)}
          colorScheme={colorScheme}
        />
      ))}
    </VStack>
  );
};

export default SelectCourseListView;

type SelectCourseListViewItemProps = {
  course: Course;
  isChecked: boolean;
  onToggleSelection: (value: string) => void;
  colorScheme?: string;
};

const SelectCourseListViewItem: FC<SelectCourseListViewItemProps> = ({
  course,
  isChecked,
  onToggleSelection,
  colorScheme = "primary",
}) => {
  const [colorScheme500, colorScheme300] = useToken("colors", [
    `${colorScheme}.500`,
    `${colorScheme}.300`,
  ]);

  return (
    <Card
      pos="relative"
      rounded="lg"
      overflow="hidden"
      w="full"
      aria-checked={isChecked}
      borderWidth="3px"
      borderColor="transparent"
      _checked={{ borderColor: colorScheme500 }}
      _hover={{ "&[aria-checked=false]": { borderColor: colorScheme300 } }}
      onClick={() => onToggleSelection(course.id)}
      cursor="pointer"
    >
      <Checkbox
        pos="absolute"
        top={4}
        right={4}
        colorScheme={colorScheme}
        size="lg"
        zIndex={100}
        value={course.id}
        isChecked={isChecked}
        borderColor={colorScheme500}
        onClick={() => onToggleSelection(course.id)}
      />
      <Flex>
        <Box pos="relative" w="15rem" minH="15rem" overflow="hidden">
          <Image
            alt=""
            src={getAbstractImage(course.id)}
            style={{ objectFit: "cover" }}
            fill
          />
        </Box>
        <CardBody ml={3}>
          <Flex direction="column" align="flex-start">
            <Text fontSize="sm" fontWeight="bold">
              {course.code}
            </Text>
            <Text fontSize="2xl" fontWeight="semibold">
              {course.title}
            </Text>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="blackAlpha.700"
              minH={6}
            >
              {course.lecturer}
            </Text>
            <Text my={2} noOfLines={3} minH={16}>
              {course.description}
            </Text>
            <Text mt={2} fontSize="sm" fontWeight="semibold">
              {course.semester == 1 ? "First Semester" : "Second Semester"}
            </Text>
            <Text fontSize="sm">
              {statusCodeToName(course.status)} - {course.units}{" "}
              {course.units > 1 ? "units" : "unit"}
            </Text>
          </Flex>
        </CardBody>
      </Flex>
    </Card>
  );
};
