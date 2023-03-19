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
  view: "list" | "grid";
  isLoading: boolean;
  courseList: Course[];
  error?: Error;
};

const CourseView: FC<CourseViewProps> = ({
  view,
  isLoading,
  courseList,
  error,
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
      <Card mt={8}>
        <CardBody>
          <Flex
            direction="column"
            align="center"
            justify="center"
            gap={8}
            py={8}
          >
            <Text>{error.message}</Text>
          </Flex>
        </CardBody>
      </Card>
    );
  }

  if (courseList.length === 0) {
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
            <Text>You are not registered for any course.</Text>
          </Flex>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      <Box mt={8}>
        {isMobile ? (
          <CourseGridView courseList={courseList} />
        ) : view == "grid" ? (
          <CourseGridView courseList={courseList} />
        ) : (
          <CourseListView courseList={courseList} />
        )}
      </Box>
    </>
  );
};

export default CourseView;
