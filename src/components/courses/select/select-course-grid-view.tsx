import {
  AspectRatio,
  Card,
  CardBody,
  Checkbox,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
  useToken,
} from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import getAbstractImage from "../../../lib/get-abstract-image";
import statusCodeToName from "../../../lib/status-code-to-name";

type SelectCourseGridViewProps = {
  courseList: Course[];
  selectedCourses: string[];
  onToggleSelection: (value: string) => void;
  colorScheme?: string;
};

const SelectCourseGridView: FC<SelectCourseGridViewProps> = ({
  courseList,
  selectedCourses,
  onToggleSelection,
  colorScheme,
}) => {
  return (
    <SimpleGrid columns={[1, null, 2, null, 3]} gap={8}>
      {courseList.map((course) => (
        <SelectCourseGridViewItem
          key={course.id}
          course={course}
          onToggleSelection={onToggleSelection}
          isChecked={selectedCourses.includes(course.id)}
          colorScheme={colorScheme}
        />
      ))}
    </SimpleGrid>
  );
};

export default SelectCourseGridView;

type SelectCourseGridViewItemProps = {
  course: Course;
  isChecked: boolean;
  onToggleSelection: (value: string) => void;
  colorScheme?: string;
};

const SelectCourseGridViewItem: FC<SelectCourseGridViewItemProps> = ({
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
      rounded="lg"
      overflow="hidden"
      aria-checked={isChecked}
      borderWidth="3px"
      borderColor="gray.200"
      _checked={{ borderColor: colorScheme500 }}
      _hover={{ "&[aria-checked=false]": { borderColor: colorScheme300 } }}
      onClick={() => onToggleSelection(course.id)}
      cursor="pointer"
    >
      <AspectRatio pos="relative" w="full" ratio={3 / 2} overflow="hidden">
        <Image
          alt=""
          src={getAbstractImage()}
          style={{ objectFit: "cover" }}
          fill
        />
      </AspectRatio>
      <CardBody p={5} display="flex" pos="relative">
        <Checkbox
          pos="absolute"
          top={4}
          right={4}
          colorScheme={colorScheme}
          size="lg"
          value={course.id}
          isChecked={isChecked}
          zIndex={100}
          borderColor={colorScheme500}
        />
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
          <Text my={2} noOfLines={3} minH={16}>
            {course.description}
          </Text>
          <Spacer />
          <Text mt={2} fontSize="sm" fontWeight="semibold">
            {course.semester == 1 ? "First Semester" : "Second Semester"}
          </Text>
          <Text fontSize="sm">
            {statusCodeToName(course.status)} - {course.units}{" "}
            {course.units > 1 ? "units" : "unit"}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};
