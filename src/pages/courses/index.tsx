import { useCourseRegPrintUrl } from "@/api/course/use-course-reg-print-url";
import { useCurrentPeriod } from "@/api/user/use-current-period";
import buildPaymentDetailUrl from "@/lib/payments/build-payment-detail-url";
import {
  Button,
  Flex,
  Icon,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NextLink from "next/link";
import { FC, useEffect, useState } from "react";
import {
  IoAdd,
  IoGrid,
  IoList,
  IoPrintOutline,
  IoTrashOutline,
} from "react-icons/io5";
import { deleteCourses } from "../../api/course.mutations";
import { courseQueries } from "../../api/course.queries";
import PageTitle from "../../components/common/page-title";
import RadioButtonGroup from "../../components/common/radio-button-group";
import Seo from "../../components/common/seo";
import CourseListControls from "../../components/courses/course-list-controls";
import CourseOverview from "../../components/courses/course-overview";
import CourseView from "../../components/courses/course-view";
import DeleteCourseView from "../../components/courses/delete/delete-course-view";
import * as routes from "../../constants/routes";

const Courses: FC = () => {
  const toast = useToast();
  const { period } = useCurrentPeriod();
  const currentSessionId = period.session.id;
  const currentSemester = period.semester.id;
  const [sessionId, setSessionId] = useState(currentSessionId);
  const [semester, setSemester] = useState(currentSemester);
  const [inDeleteCourseView, setInDeleteCourseView] = useState(false);
  const queryClient = useQueryClient();
  const { data: canRegisterCurrentSemester } = useQuery(
    courseQueries.registrationOpenBy(semester)
  );
  const { data: canDeleteCurrentSemester } = useQuery(
    courseQueries.deletionOpenBy(semester)
  );
  const [view, setView] = useState("list");
  const {
    data: registeredCourses,
    error: registeredCoursesError,
    isLoading: registeredCoursesIsLoading,
  } = useQuery({
    ...courseQueries.registeredBy(sessionId, semester),
    enabled: !!sessionId,
    retry: (errorCount, error) => {
      const err = error as Error;
      if (err.message.includes("payment")) return false;
      else return errorCount < 3;
    },
  });
  const { data: courseStats, error: courseStatsError } = useQuery(
    courseQueries.statisticsFor(sessionId, semester)
  );

  useEffect(() => {
    if (courseStatsError) {
      toast({
        title: "Error fetching course statistics",
        description: courseStatsError.message,
        status: "error",
        isClosable: true,
      });
    }
  }, [courseStatsError, toast]);

  const courses = registeredCourses || [];
  const canAddCourses =
    sessionId === currentSessionId &&
    semester === currentSemester &&
    !inDeleteCourseView &&
    canRegisterCurrentSemester &&
    !registeredCoursesError;
  const canDeleteCourses =
    sessionId === currentSessionId &&
    canRegisterCurrentSemester &&
    !registeredCoursesError &&
    canDeleteCurrentSemester;

  const deleteCoursesMutation = useMutation({
    mutationFn: deleteCourses,
    onSuccess: () => {
      queryClient.invalidateQueries(
        courseQueries.registeredBy(sessionId, semester)
      );
      queryClient.invalidateQueries(
        courseQueries.statisticsFor(sessionId, semester)
      );
    },
  });
  const onDelete = (ids: string[]) => {
    deleteCoursesMutation.mutate(
      { ids },
      {
        onSuccess: () => {
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
        maxUnits={courseStats?.maxUnits || 0}
        minUnits={courseStats?.minUnits || 0}
        registeredUnits={courseStats?.totalUnits || 0}
        coursesRegistered={courseStats?.totalCourses || 0}
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
            <Popover trigger="hover">
              <PopoverTrigger>
                <Button
                  mx="auto"
                  display="inline-flex"
                  gap={4}
                  // isDisabled={
                  //   printUrl.isLoading ||
                  //   !!printUrl.error ||
                  //   (!!printUrl.prerequisites &&
                  //     printUrl.prerequisites.length > 0)
                  // }
                  onClick={() => {
                    if (!printUrl.isLoading && printUrl.url)
                      window.open(printUrl.url as string);
                  }}
                >
                  {printUrl.isLoading ? (
                    <Spinner size="xs" color="white" />
                  ) : (
                    <Icon as={IoPrintOutline} boxSize={6} />
                  )}
                  Print Course Registration
                </Button>
              </PopoverTrigger>
              {(printUrl.prerequisites || printUrl.error?.message) && (
                <PopoverContent bg={"gray.400"} color="white">
                  <PopoverArrow bg={"gray.400"} />
                  <PopoverBody rounded={"md"}>
                    {printUrl.prerequisites ? (
                      <p>
                        You must pay all outstanding fees to print your course
                        registration:{" "}
                        {printUrl.prerequisites
                          .map((item) => (
                            <Link
                              key={`${item.id}-${item.transactionRef}`}
                              as={NextLink}
                              href={buildPaymentDetailUrl({
                                id: item.id,
                                trxRef: item.transactionRef,
                                trxType: item.transactionType,
                              })}
                              textDecorationStyle="solid"
                              textDecorationLine="underline"
                            >
                              {item.name}
                            </Link>
                          ))
                          .reduce((prev, curr, idx) => {
                            if (
                              idx !== 0 &&
                              idx === (printUrl.prerequisites?.length || 0) - 1
                            )
                              prev.push(" and ");
                            else if (idx !== 0) prev.push(", ");
                            prev.push(curr);
                            return prev;
                          }, [] as (JSX.Element | string)[])}
                      </p>
                    ) : (
                      printUrl.error?.message ?? ""
                    )}
                  </PopoverBody>
                </PopoverContent>
              )}
            </Popover>
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
          isLoading={registeredCoursesIsLoading}
          error={registeredCoursesError as Error}
        />
      )}
    </>
  );
};

export default Courses;
