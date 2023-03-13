import { Button, Flex, Icon, Link, useToast } from "@chakra-ui/react";
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
import { useAllSessions } from "../../api/course/use-all-sessions";
import { useCourseStatistics } from "../../api/course/use-course-statistics";
import { useRegisteredCourses } from "../../api/course/use-registered-course";
import { useRegistrationOpen } from "../../api/course/use-registration-open";
import { useDeleteCourses } from "../../api/course/use-delete-courses";

const Courses: FC = () => {
  const [sessionId, setSessionId] = useState("");
  const [latestSessionId, setLatestSessionId] = useState("");
  const [semester, setSemester] = useState(0);
  const canRegister = useRegistrationOpen();
  const canDeleteCourses = true;
  const [view, setView] = useState("list");
  const [inDeleteCourseView, setInDeleteCourseView] = useState(false);
  const registeredCourses = useRegisteredCourses({
    variables: { session: sessionId },
  });
  const filteredCourses =
    registeredCourses.data?.filter(
      (course) => semester === 0 || course.semester === semester
    ) || [];
  const courseStats = useCourseStatistics({
    variables: {
      session: sessionId,
      semester: semester === 0 ? undefined : semester,
    },
  });
  useAllSessions({
    onSuccess: (data) => {
      if (data.length > 0) {
        setLatestSessionId(data[0].id);
      }
    },
  });

  const toast = useToast();
  const deleteCourses = useDeleteCourses();
  const onDelete = (ids: string[]) => {
    deleteCourses.mutate(
      { ids },
      {
        onSuccess: () => {
          registeredCourses.refetch();
          setInDeleteCourseView(false);
          toast({
            title: "Courses deleted successfully",
            status: "success",
            isClosable: true,
          });
        },
        onError: (err) => {
          const error = err as Error;
          toast({
            title: "Error deleting courses",
            description: error.message,
            status: "error",
            isClosable: true,
          });
        },
      }
    );
  };

  return (
    <>
      <Seo title="Registered Courses" />
      <PageTitle showBackButton>Registered Courses</PageTitle>
      <CourseListControls
        sessionId={sessionId}
        onSessionIdChange={setSessionId}
        semester={semester}
        onSemesterChange={setSemester}
      />
      <CourseOverview
        maxUnits={courseStats.data?.maxUnits || 0}
        minUnits={courseStats.data?.minUnits || 0}
        registeredUnits={courseStats.data?.totalUnits || 0}
        coursesRegistered={courseStats.data?.totalCourses || 0}
        minMaxActive={sessionId === latestSessionId}
      />
      <Flex mt={6} gap={4} justify="space-between" align="center">
        <Flex gap={4} wrap="wrap" justify={["center", null, "initial"]}>
          {!inDeleteCourseView && canRegister.data && (
            <Link
              variant="button"
              as={NextLink}
              href={routes.ADD_COURSES}
              display="inline-flex"
              gap={4}
              alignItems="center"
              h={10}
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
          onDelete={onDelete}
          view={view as "list" | "grid"}
        />
      ) : (
        <CourseView
          courseList={filteredCourses}
          view={view as "list" | "grid"}
          isLoading={registeredCourses.isLoading}
        />
      )}
    </>
  );
};

export default Courses;
