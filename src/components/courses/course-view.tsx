import { Box, Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import CourseGridView from "./course-grid-view";
import CourseListView from "./course-list-view";

type CourseViewProps = {
  view: "list" | "grid";
  courseList: Course[];
};

const CourseView: FC<CourseViewProps> = ({ view, courseList }) => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { fallback: undefined }
  );

  if (isMobile === null) return null;

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
      <Flex justify="center" mt={6}>
        <Button>Print Course Registration</Button>
      </Flex>
    </>
  );
};

export default CourseView;
