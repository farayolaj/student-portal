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
import CourseGridView from "./course-grid-view";
import CourseListView from "./course-list-view";

type CourseViewProps = {
  courseList: Course[];
  view: "list" | "grid";
  isLoading: boolean;
  error?: Error;
};

const CourseView: FC<CourseViewProps> = ({
  courseList,
  view,
  isLoading,
  error,
}) => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { fallback: undefined }
  );

  if (isLoading)
    return (
      <Card mt={8}>
        <CardBody>
          <Flex
            direction="column"
            align="center"
            justify="center"
            gap={8}
            py={8}
          >
            <Spinner size="lg" />
          </Flex>
        </CardBody>
      </Card>
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
            <Text color="red.600" textAlign="center">
              {error.message}
            </Text>
          </Flex>
        </CardBody>
      </Card>
    );
  }

  return (
    <Box mt={8}>
      {view === "grid" || isMobile ? (
        <CourseGridView courseList={courseList} />
      ) : (
        <CourseListView courseList={courseList} />
      )}
    </Box>
  );
};

export default CourseView;
