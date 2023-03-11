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
import NextLink from "next/link";
import { ADD_COURSES } from "../../constants/routes";
import CourseGridView from "./course-grid-view";
import CourseListView from "./course-list-view";

type CourseViewProps = {
  view: "list" | "grid";
  isLoading: boolean;
  courseList: Course[];
};

const CourseView: FC<CourseViewProps> = ({ view, isLoading, courseList }) => {
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
            <Text>You have not registered for any course.</Text>
            <Link as={NextLink} variant="button" href={ADD_COURSES}>
              Register Courses
            </Link>
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
