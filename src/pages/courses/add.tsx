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
          <Input pr={4} type="search" />
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
