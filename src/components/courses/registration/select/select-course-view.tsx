import {
  Box,
  Card,
  CardBody,
  Flex,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FC } from "react";
import SelectCourseGridView from "./select-course-grid-view";
import SelectCourseListView from "./select-course-list-view";

type SelectCourseViewProps = {
  view: "list" | "grid";
  isLoading: boolean;
  error?: string | null;
  courseList: Course[];
  selectedCourses: string[];
  onToggleSelection: (value: string) => void;
};

const SelectCourseView: FC<SelectCourseViewProps> = ({
  view,
  courseList,
  selectedCourses,
  isLoading,
  error,
  onToggleSelection,
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
          onToggleSelection={onToggleSelection}
        />
      ) : view == "grid" ? (
        <SelectCourseGridView
          courseList={courseList}
          selectedCourses={selectedCourses}
          onToggleSelection={onToggleSelection}
        />
      ) : (
        <SelectCourseListView
          courseList={courseList}
          selectedCourses={selectedCourses}
          onToggleSelection={onToggleSelection}
        />
      )}
    </Box>
  );
};

export default SelectCourseView;
