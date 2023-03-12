import {
  Box,
  Card,
  CardBody,
  Flex,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FC } from "react";
import { ADD_COURSES } from "../../../constants/routes";
import SelectCourseGridView from "./select-course-grid-view";
import SelectCourseListView from "./select-course-list-view";

type SelectCourseViewProps = {
  view: "list" | "grid";
  isLoading: boolean;
  error?: string | null;
  courseList: Course[];
  selectedCourses: string[];
  onChange: (values: string[]) => void;
};

const SelectCourseView: FC<SelectCourseViewProps> = ({
  view,
  courseList,
  selectedCourses,
  isLoading,
  error,
  onChange,
}) => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { fallback: undefined }
  );

  if (isMobile === null) return null;

  if (isLoading)
    return (
      <Flex py={16} justify="center">
        <Spinner
          size="xl"
          emptyColor="gray.200"
          color="primary.500"
          thickness="4px"
        />
      </Flex>
    );

  if (error) {
    return (
      <Card mt={8} bg="red.100">
        <CardBody>
          <Flex
            direction="column"
            align="center"
            justify="center"
            gap={8}
            py={8}
          >
            <Text>{error}</Text>
          </Flex>
        </CardBody>
      </Card>
    );
  }

  return (
    <Box mt={8}>
      {isMobile ? (
        <SelectCourseGridView
          courseList={courseList}
          selectedCourses={selectedCourses}
          onChange={onChange}
        />
      ) : view == "grid" ? (
        <SelectCourseGridView
          courseList={courseList}
          selectedCourses={selectedCourses}
          onChange={onChange}
        />
      ) : (
        <SelectCourseListView
          courseList={courseList}
          selectedCourses={selectedCourses}
          onChange={onChange}
        />
      )}
    </Box>
  );
};

export default SelectCourseView;
