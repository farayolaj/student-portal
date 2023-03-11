import {
  Box,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Flex,
  Text,
  useToken,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { FC, useRef } from "react";
import getAbstractImage from "../../../lib/get-abstract-image";

type SelectCourseListViewProps = {
  courseList: Course[];
  selectedCourses: string[];
  onChange: (values: string[]) => void;
  colorScheme?: string;
};

const SelectCourseListView: FC<SelectCourseListViewProps> = ({
  courseList,
  selectedCourses,
  onChange,
  colorScheme,
}) => {
  return (
    <CheckboxGroup defaultValue={selectedCourses} onChange={onChange}>
      <VStack spacing={8}>
        {courseList.map((course) => (
          <SelectCourseListViewItem
            key={course.id}
            course={course}
            isChecked={selectedCourses.includes(course.id)}
            colorScheme={colorScheme}
          />
        ))}
      </VStack>
    </CheckboxGroup>
  );
};

export default SelectCourseListView;

type SelectCourseListViewItemProps = {
  course: Course;
  isChecked: boolean;
  colorScheme?: string;
};

const SelectCourseListViewItem: FC<SelectCourseListViewItemProps> = ({
  course,
  isChecked,
  colorScheme = "primary",
}) => {
  const ref = useRef<HTMLInputElement>(null);
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
      onClick={() => ref.current?.click()}
      cursor="pointer"
    >
      <Checkbox
        pos="absolute"
        top={4}
        right={4}
        colorScheme={colorScheme}
        size="lg"
        zIndex={100}
        ref={ref}
        value={course.id}
        borderColor={colorScheme500}
      />
      <Flex>
        <Box pos="relative" w="15rem" h="15rem" overflow="hidden">
          <Image
            alt=""
            src={getAbstractImage()}
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
