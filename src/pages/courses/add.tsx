import {
  Flex,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import AddCourseOverviewCard from "../../components/courses/add/add-course-overview-card";
import SelectCourseListControl from "../../components/courses/select/select-course-list-control";
import SelectCourseView from "../../components/courses/select/select-course-view";
import { courses } from "../../data/courses";

export default function AddCoursesPage(): JSX.Element {
  const [semester, setSemester] = useState("all");
  const [view, setView] = useState("list");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  return (
    <>
      <Seo title="Add Courses" />
      <PageTitle showBackButton>Add Courses</PageTitle>
      <SelectCourseListControl
        session="2019/2020"
        semester={semester}
        onSemesterChange={setSemester}
        view={view}
        onViewChange={setView}
      />
      <AddCourseOverviewCard
        minUnits={10}
        maxUnits={20}
        selectedCourses={courses.filter((course) =>
          selectedCourses.includes(course.id)
        )}
      />
      <Flex mt={8} justify="flex-end">
        <InputGroup pr={0} w={80} variant="primary">
          <Input
            pr={4}
            type="search"
            placeholder="Search for more courses..."
            _placeholder={{
              color: "black",
            }}
          />
          <InputRightElement>
            <IconButton
              aria-label="Search for course"
              icon={<IoSearchOutline fontSize="1.5rem" />}
              h="1.75rem"
              size="sm"
              // onClick={}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
      <SelectCourseView
        courseList={courses.filter(
          (course) =>
            semester === "all" ||
            (course.semester === 1 && semester === "first") ||
            (course.semester === 2 && semester === "second")
        )}
        view={view as "list" | "grid"}
        selectedCourses={selectedCourses}
        onChange={setSelectedCourses}
      />
      <Flex justify="center" mt={6} pos="sticky" bottom={8}>
        {selectedCourses.length > 0 && (
          <Button boxShadow="lg" w="80%">
            Add {selectedCourses.length} Course
            {selectedCourses.length > 1 && "s"}
          </Button>
        )}
      </Flex>
    </>
  );
}
