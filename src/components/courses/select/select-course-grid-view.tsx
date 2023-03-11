import {
  AspectRatio,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  Flex,
  SimpleGrid,
  Spacer,
  Text,
  useToken,
} from "@chakra-ui/react";
import Image from "next/image";
import { FC, useRef } from "react";
import getAbstractImage from "../../../lib/get-abstract-image";

type SelectCourseGridViewProps = {
  courseList: Course[];
  selectedCourses: string[];
  onChange: (values: string[]) => void;
  colorScheme?: string;
};

const SelectCourseGridView: FC<SelectCourseGridViewProps> = ({
  courseList,
  selectedCourses,
  onChange,
  colorScheme,
}) => {
  return (
    <CheckboxGroup defaultValue={selectedCourses} onChange={onChange}>
      <SimpleGrid columns={[1, null, 2, null, 3]} gap={8}>
        {courseList.map((course) => (
          <SelectCourseGridViewItem
            key={course.id}
            course={course}
            isChecked={selectedCourses.includes(course.id)}
            colorScheme={colorScheme}
          />
        ))}
      </SimpleGrid>
    </CheckboxGroup>
  );
};

export default SelectCourseGridView;

type SelectCourseGridViewItemProps = {
  course: Course;
  isChecked: boolean;
  colorScheme?: string;
};

const SelectCourseGridViewItem: FC<SelectCourseGridViewItemProps> = ({
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
      rounded="lg"
      overflow="hidden"
      aria-checked={isChecked}
      borderWidth="3px"
      borderColor="gray.200"
      _checked={{ borderColor: colorScheme500 }}
      _hover={{ "&[aria-checked=false]": { borderColor: colorScheme300 } }}
      onClick={() => ref.current?.click()}
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
          ref={ref}
          value={course.id}
          zIndex={100}
          borderColor={colorScheme500}
        />
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
