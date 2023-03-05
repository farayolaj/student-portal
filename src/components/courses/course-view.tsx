import { Box } from "@chakra-ui/react";
import { FC } from "react";
import CourseGridView from "./course-grid-view";
import CourseListView from "./course-list-view";

type CourseViewProps = {
  view: "list" | "grid";
  courseList: Course[];
};

const CourseView: FC<CourseViewProps> = ({ view, courseList }) => {
  return (
    <Box mt={8}>
      {view == "grid" ? (
        <CourseGridView courseList={courseList} />
      ) : (
        <CourseListView courseList={courseList} />
      )}
    </Box>
  );
};

export default CourseView;
