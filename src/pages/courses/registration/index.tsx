import { useCourseRegPrintUrl } from "@/api/course/use-course-reg-print-url";
import { useSchoolPeriod } from "@/api/user/use-current-period";
import CourseListControls from "@/components/courses/registration/course-list-controls";
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
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { FC, useEffect, useState } from "react";
import {
  IoAdd,
  IoGrid,
  IoList,
  IoPrintOutline,
} from "react-icons/io5";
import { courseQueries } from "../../../api/course.queries";
import PageTitle from "../../../components/common/page-title";
import RadioButtonGroup from "../../../components/common/radio-button-group";
import Seo from "../../../components/common/seo";
import CourseOverview from "../../../components/courses/registration/course-overview";
import CourseView from "../../../components/courses/registration/course-view";
import * as routes from "../../../constants/routes";

const CourseRegistration: FC = () => {
  const toast = useToast();
  const { period } = useSchoolPeriod();
  const currentSessionId = period.session.id;
  const currentSemester = period.semester.id;
  const [sessionId, setSessionId] = useState(currentSessionId);
  const [semester, setSemester] = useState(currentSemester);
  const { data: canRegisterCurrentSemester } = useQuery(
    courseQueries.registrationOpenBy(semester)
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
    canRegisterCurrentSemester &&
    !registeredCoursesError;

  const printUrl = useCourseRegPrintUrl(sessionId, semester);

  return (
    <>
      <Seo title="Course Registration" />
      <PageTitle showBackButton>Course Registration</PageTitle>
      <CourseListControls
        sessionId={sessionId}
        onSessionIdChange={setSessionId}
        semester={semester}
        onSemesterChange={setSemester}
        inDeleteView={false}
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
              Register Courses
            </Link>
          )}
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
      <CourseView
        courseList={courses}
        view={view as "list" | "grid"}
        isLoading={registeredCoursesIsLoading}
        error={registeredCoursesError as Error}
      />
    </>
  );
};

export default CourseRegistration;
