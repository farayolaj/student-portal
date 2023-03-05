import { Button, Flex, HStack, Link, Spacer } from "@chakra-ui/react";
import { FC, useState } from "react";
import NextLink from "next/link";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import CourseListControls from "../../components/courses/course-list-controls";
import CourseOverview from "../../components/courses/course-overview";
import RadioButtonGroup from "../../components/common/radio-button-group";
import { IoGrid, IoList } from "react-icons/io5";
import CourseView from "../../components/courses/course-view";
import * as routes from "../../constants/routes";

const courses: Course[] = [
  {
    id: "GES 101",
    title: "Use of English",
    description:
      "Veniam enim exercitation et occaecat do ullamco proident qui labore irure reprehenderit est. Do aliquip cupidatat est mollit irure sint sunt consectetur Lorem amet ipsum occaecat. Dolor mollit cupidatat occaecat dolor esse aliqua esse fugiat non quis ullamco esse.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 1,
    status: "Required",
    materialLink: "#",
  },
  {
    id: "GES 102",
    title: "Use of English",
    description:
      "Reprehenderit occaecat irure voluptate et nostrud. Aliqua commodo officia velit cupidatat cupidatat. Dolore aliqua sint officia ad consequat veniam quis. Nisi adipisicing in dolor enim sit excepteur enim eu esse Lorem ad. Est duis qui sint mollit.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 2,
    status: "Required",
    materialLink: "#",
  },
  {
    id: "GES 103",
    title: "Use of English",
    description:
      "Culpa fugiat voluptate consequat in laboris enim magna. Esse eiusmod adipisicing est do duis ex Lorem. Occaecat eu id commodo reprehenderit voluptate laboris.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 1,
    status: "Required",
    materialLink: "#",
  },
  {
    id: "GES 104",
    title: "Use of English",
    description:
      "Est occaecat labore eu sit elit ex culpa. Cillum magna aute eiusmod cillum qui. Magna in aute minim adipisicing nulla in aliquip occaecat officia exercitation non id incididunt. Sunt aute ex culpa ad culpa. Irure ullamco consectetur reprehenderit dolor aute.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 1,
    status: "Required",
    materialLink: "#",
  },
  {
    id: "GES 105",
    title: "African Culture and Civilisation",
    description:
      "Amet enim incididunt magna commodo. Laboris ex mollit elit ut dolor duis consequat exercitation in eiusmod occaecat ullamco dolor. Id est exercitation adipisicing eiusmod irure labore in duis.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 2,
    status: "Required",
    materialLink: "#",
  },
  {
    id: "GES 106",
    title: "Government, Politics and Administration",
    description:
      "Sint ea anim dolor commodo velit. Proident ipsum amet non non mollit voluptate laborum elit. Labore anim dolor enim occaecat. Labore fugiat nulla labore sunt eu. Sint ut excepteur ad nisi officia Lorem duis veniam qui.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 2,
    status: "Required",
    materialLink: "#",
  },
  {
    id: "GES 107",
    title: "Use of English",
    description:
      "Occaecat sunt nostrud ad exercitation in sit ad excepteur aute id ad minim. Eu irure id incididunt excepteur labore officia fugiat do fugiat sunt. Magna exercitation anim laboris ipsum occaecat in quis.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 1,
    status: "Required",
    materialLink: "#",
  },
];

const Courses: FC = () => {
  const [session, setSession] = useState("2020-2021");
  const [semester, setSemester] = useState("all");
  const canAddCourses = true;
  const canDeleteCourses = true;
  const [view, setView] = useState("list");

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
      />
      <HStack mt={6} spacing={4}>
        {canAddCourses && (
          <Link variant="button" as={NextLink} href={routes.ADD_COURSES}>
            Add Courses
          </Link>
        )}
        <Spacer display={["unset", null, "none"]} />
        {canDeleteCourses && (
          <Link variant="button" as={NextLink} href={routes.DELETE_COURSES}>
            Delete Courses
          </Link>
        )}
        <Spacer display={["none", null, "unset"]} />
        <RadioButtonGroup
          display={["none", null, "flex"]}
          options={[<IoList key="list" />, <IoGrid key="grid" />]}
          labels={["List View", "Grid View"]}
          values={["list", "grid"]}
          value={view}
          onChange={setView}
        />
      </HStack>
      <CourseView
        courseList={courses.filter(
          (course) =>
            semester === "all" ||
            (course.semester === 1 && semester === "first") ||
            (course.semester === 2 && semester === "second")
        )}
        view={view as "list" | "grid"}
      />
      <Flex justify="center" mt={6}>
        <Button>Print Course Registration</Button>
      </Flex>
    </>
  );
};

export default Courses;
