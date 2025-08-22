import { useCurrentPeriod } from "@/api/user/use-current-period";
import { Button, Flex, Link, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import NextLink from "next/link";
import { FC, useState } from "react";
import { IoGrid, IoList } from "react-icons/io5";
import { courseQueries } from "../../api/course.queries";
import PageTitle from "../../components/common/page-title";
import RadioButtonGroup from "../../components/common/radio-button-group";
import Seo from "../../components/common/seo";
import CourseView from "../../components/courses/course-view";
import * as routes from "../../constants/routes";

const Courses: FC = () => {
  const { period } = useCurrentPeriod();
  const currentSessionId = period.session.id;
  const currentSemester = period.semester.id;

  const [view, setView] = useState("list");

  const {
    data: activeCourses,
    error: activeCoursesError,
    isLoading: activeCoursesIsLoading,
  } = useQuery({
    ...courseQueries.registeredBy(currentSessionId, currentSemester),
    enabled: !!currentSessionId,
    retry: (errorCount, error) => {
      const err = error as Error;
      if (err.message.includes("payment")) return false;
      else return errorCount < 3;
    },
  });

  const courses = activeCourses || [];

  return (
    <>
      <Seo title="Courses" />
      <PageTitle showBackButton>Courses</PageTitle>

      {activeCoursesError &&
        !activeCoursesError.message.includes("payment") && (
          <Text color="red.500" mb={4}>
            Error loading courses: {activeCoursesError.message}
          </Text>
        )}

      {activeCoursesError && activeCoursesError.message.includes("payment") && (
        <Flex direction="column" align="center" justify="center" gap={4} py={8}>
          <Text textAlign="center">
            Please complete your payment to access your courses.
          </Text>
          <Button as={NextLink} href={routes.PAYMENTS} colorScheme="primary">
            Make Payment
          </Button>
        </Flex>
      )}

      {courses.length === 0 &&
        !activeCoursesError &&
        !activeCoursesIsLoading && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            gap={4}
            py={8}
          >
            <Text>You have no active courses for this session.</Text>
            <Link
              as={NextLink}
              href={routes.COURSE_REGISTRATION}
              variant="button"
            >
              Register Courses
            </Link>
          </Flex>
        )}

      {courses.length > 0 && (
        <>
          <Flex gap={4} justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="semibold">
              {["", "First", "Second"][period.semester.id]} Semester,{" "}
              {period.session.name} Session
            </Text>

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
            isLoading={activeCoursesIsLoading}
            error={activeCoursesError as Error}
          />
        </>
      )}
    </>
  );
};

export default Courses;
