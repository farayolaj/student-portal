import { Button, Flex, HStack, Icon, Link, Spacer } from "@chakra-ui/react";
import { FC, useState } from "react";
import NextLink from "next/link";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import CourseListControls from "../../components/courses/course-list-controls";
import CourseOverview from "../../components/courses/course-overview";
import RadioButtonGroup from "../../components/common/radio-button-group";
import {
  IoAdd,
  IoGrid,
  IoList,
  IoPrintOutline,
  IoTrashOutline,
} from "react-icons/io5";
import CourseView from "../../components/courses/course-view";
import * as routes from "../../constants/routes";
import DeleteCourseView from "../../components/courses/delete/delete-course-view";
import { courses } from "../../data/courses";

const Courses: FC = () => {
  const [session, setSession] = useState("2020-2021");
  const [semester, setSemester] = useState("all");
  const canAddCourses = true;
  const canDeleteCourses = true;
  const [view, setView] = useState("list");
  const [inDeleteCourseView, setInDeleteCourseView] = useState(false);
  const filteredCourses = courses.filter(
    (course) =>
      semester === "all" ||
      (course.semester === 1 && semester === "first") ||
      (course.semester === 2 && semester === "second")
  );

  return (
    <>
      <Seo title="Registered Courses" />
      <PageTitle showBackButton>Registered Courses</PageTitle>
      <CourseListControls
        session={session}
        onSessionChange={setSession}
        semester={semester}
        onSemesterChange={setSemester}
      />
      <CourseOverview
        maxUnits={21}
        minUnits={12}
        registeredUnits={15}
        coursesRegistered={5}
        minMaxActive={session === "2020-2021"}
      />
      <Flex mt={6} gap={4} justify="space-between">
        <Flex gap={4} wrap="wrap" justify={["space-between", null, "initial"]}>
          {!inDeleteCourseView && canAddCourses && (
            <Link
              variant="button"
              as={NextLink}
              href={routes.ADD_COURSES}
              display="inline-flex"
              gap={4}
              alignItems="center"
              py={0}
            >
              <Icon as={IoAdd} boxSize={6} />
              Add Courses
            </Link>
          )}
          {canDeleteCourses && (
            <Button
              onClick={() => setInDeleteCourseView((prev) => !prev)}
              display="inline-flex"
              gap={4}
            >
              <Icon as={IoTrashOutline} boxSize={6} />
              {inDeleteCourseView ? "Cancel" : "Delete Courses"}
            </Button>
          )}
          {!inDeleteCourseView && (
            <Button mx="auto" display="inline-flex" gap={4}>
              <Icon as={IoPrintOutline} boxSize={6} />
              Print Course Registration
            </Button>
          )}
        </Flex>
        <RadioButtonGroup
          display={["none", null, "flex"]}
          options={[<IoList key="list" />, <IoGrid key="grid" />]}
          labels={["List View", "Grid View"]}
          values={["list", "grid"]}
          value={view}
          onChange={setView}
        />
      </Flex>
      {inDeleteCourseView ? (
        <DeleteCourseView
          courseList={filteredCourses}
          onDelete={() => setInDeleteCourseView(false)}
          view={view as "list" | "grid"}
        />
      ) : (
        <CourseView
          courseList={filteredCourses}
          view={view as "list" | "grid"}
        />
      )}
    </>
  );
};

export default Courses;
