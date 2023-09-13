import { Button, Flex, Icon, Link, Spinner, useToast } from "@chakra-ui/react";
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
import { useCourseStatistics } from "../../api/course/use-course-statistics";
import { useRegisteredCourses } from "../../api/course/use-registered-courses";
import { useRegistrationOpen } from "../../api/course/use-registration-open";
import { useDeleteCourses } from "../../api/course/use-delete-courses";
import { useCourseRegPrintUrl } from "@/api/course/use-course-reg-print-url";
import { useCurrentPeriod } from "@/api/user/use-current-period";

const Courses: FC = () => {
  const { period } = useCurrentPeriod();
  const currentSessionId = period.session.id;
  const currentSemester = period.semester.id;
  const [sessionId, setSessionId] = useState(currentSessionId);
  const [semester, setSemester] = useState(currentSemester);
  const [inDeleteCourseView, setInDeleteCourseView] = useState(false);
  const canRegisterCurrentSemester = useRegistrationOpen({
    variables: { semester },
  });
  const [view, setView] = useState("list");
  const registeredCourses = useRegisteredCourses({
    variables: { session: sessionId, semester: semester },
    enabled: !!sessionId,
    retry: (errorCount, error) => {
      const err = error as Error;
      if (err.message.includes("payment")) return false;
      else return errorCount < 3;
    },
    refetchOnWindowFocus: false,
  });
  const courseStats = useCourseStatistics({
    variables: {
      session: sessionId,
      semester: semester,
    },
    onError: (err) => {
      toast({
        title: "Error fetching course statistics",
        description: (err as Error).message,
        status: "error",
        isClosable: true,
      });
    },
  });

  const courses = registeredCourses.data || [];
  const canAddCourses =
    sessionId === currentSessionId &&
    semester === currentSemester &&
    !inDeleteCourseView &&
    canRegisterCurrentSemester.data &&
    !registeredCourses.error;
  const canDeleteCourses =
    sessionId === currentSessionId &&
    canRegisterCurrentSemester.data &&
    !registeredCourses.error;

  const toast = useToast();
  const deleteCourses = useDeleteCourses();
  const onDelete = (ids: string[]) => {
    deleteCourses.mutate(
      { ids },
      {
        onSuccess: () => {
          registeredCourses.refetch();
          setInDeleteCourseView(false);
          courseStats.refetch();
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

  const printUrl = useCourseRegPrintUrl(sessionId, semester);

  return (
    <>
      <Seo title="Registered Courses" />
      <PageTitle showBackButton>Registered Courses</PageTitle>
      <CourseListControls
        sessionId={sessionId}
        onSessionIdChange={setSessionId}
        semester={semester}
        onSemesterChange={setSemester}
        inDeleteView={inDeleteCourseView}
      />
      <CourseOverview
        maxUnits={courseStats.data?.maxUnits || 0}
        minUnits={courseStats.data?.minUnits || 0}
        registeredUnits={courseStats.data?.totalUnits || 0}
        coursesRegistered={courseStats.data?.totalCourses || 0}
        minMaxActive={sessionId === currentSessionId}
      />
      <Flex mt={6} gap={4} justify="space-between" align="center">
        <Flex gap={4} wrap="wrap" justify={["center", null, "initial"]}>
          {canAddCourses && (
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
            <Button
              mx="auto"
              display="inline-flex"
              gap={4}
              isDisabled={printUrl.isLoading || !!printUrl.error}
              onClick={() => {
                window.open(printUrl.url as string);
              }}
              title={printUrl.error?.message}
            >
              {printUrl.isLoading ? (
                <Spinner size="xs" color="white" />
              ) : (
                <Icon as={IoPrintOutline} boxSize={6} />
              )}
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
          courseList={courses}
          onDelete={onDelete}
          view={view as "list" | "grid"}
        />
      ) : (
        <CourseView
          courseList={courses}
          view={view as "list" | "grid"}
          isLoading={registeredCourses.isLoading}
          error={registeredCourses.error as Error}
        />
      )}
    </>
  );
};

export default Courses;
