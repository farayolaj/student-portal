import { Box, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import SelectCourseGridView from "./select-course-grid-view";
import SelectCourseListView from "./select-course-list-view";

type SelectCourseViewProps = {
  view: "list" | "grid";
  courseList: Course[];
  selectedCourses: string[];
  onChange: (values: string[]) => void;
};

const SelectCourseView: FC<SelectCourseViewProps> = ({
  view,
  courseList,
  selectedCourses,
  onChange,
}) => {
  const useGridOnly = useBreakpointValue([true, null, true]);

  return (
    <Box mt={8}>
      {useGridOnly ? (
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
