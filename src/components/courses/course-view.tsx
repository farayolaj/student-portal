import { Box, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import CourseGridView from "./course-grid-view";
import CourseListView from "./course-list-view";

type CourseViewProps = {
  view: "list" | "grid";
  courseList: Course[];
};

const CourseView: FC<CourseViewProps> = ({ view, courseList }) => {
  const isMobile = useBreakpointValue([true, null, false]);
  return (
    <Box mt={8}>
      {isMobile ? (
        <CourseGridView courseList={courseList} />
      ) : view == "grid" ? (
        <CourseGridView courseList={courseList} />
      ) : (
        <CourseListView courseList={courseList} />
      )}
    </Box>
  );
};

export default CourseView;
