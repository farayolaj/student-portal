import { useCurrentPeriod } from "@/api/user/use-current-period";
import {
  Flex,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useAddCourses } from "../../api/course/use-add-courses";
import { useAllCourses } from "../../api/course/use-all-courses";
import { useCourseConfig } from "../../api/course/use-course-config";
import { useRegisteredCourses } from "../../api/course/use-registered-courses";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import AddCourseOverviewCard from "../../components/courses/add/add-course-overview-card";
import AddMoreCoursesModal from "../../components/courses/add/add-more-courses-modal";
import SelectCourseListControl from "../../components/courses/select/select-course-list-control";
import SelectCourseView from "../../components/courses/select/select-course-view";
import { REGISTERED_COURSES } from "../../constants/routes";

export default function AddCoursesPage(): JSX.Element {
  const [semester, setSemester] = useState(1);
  const [view, setView] = useState("list");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [extraCourses, setExtraCourses] = useState<Course[]>([]);
  const courseConfig = useCourseConfig();
  const maxUnits = courseConfig.data?.find(
    (c) => c.semester === semester
  )?.maxUnits;
  const minUnits = courseConfig.data?.find(
    (c) => c.semester === semester
  )?.minUnits;

  const { period } = useCurrentPeriod();
  const registeredCourses = useRegisteredCourses({
    variables: {
      session: period?.session?.id as string,
      semester: period.semester.id,
    },
    enabled: !!period,
  });

  const allCourses = useAllCourses({
    variables: { semester },
    enabled: !!registeredCourses.data,
    select: (data) => {
      return data.filter(
        (course) =>
          registeredCourses.data?.findIndex((r) => r.id === course.id) == -1
      );
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (selectedCourses.length > 0) return;

      const selected = data
        .filter((course) => course.preSelected)
        .map((course) => course.id);
      setSelectedCourses(selected);
    },
  });

  const addCourses = useAddCourses();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const router = useRouter();
  const toast = useToast();
  const allCoursesWithExtras = [...(allCourses.data || []), ...extraCourses];

  const onSelectAll = () => {
    setSelectedCourses(allCoursesWithExtras.map((course) => course.id));
  };

  const onUnselectAll = () => {
    setSelectedCourses([]);
  };

  return (
    <>
      <Seo title="Add Courses" />
      <PageTitle showBackButton>Add Courses</PageTitle>
      <SelectCourseListControl
        session={period?.session?.name || ""}
        semester={semester}
        onSemesterChange={setSemester}
        view={view}
        onViewChange={setView}
      />
      <AddCourseOverviewCard
        minUnits={minUnits || 0}
        maxUnits={maxUnits || 0}
        selectedCourses={[
          ...(registeredCourses.data || []),
          ...allCoursesWithExtras.filter((course) =>
            selectedCourses.includes(course.id)
          ),
        ]}
      />
      <Flex mt={8} justify="space-between">
        <AddMoreCoursesModal
          onAdd={(course) => {
            setExtraCourses((prev) => [...prev, course]);
            setSelectedCourses((prev) => [...prev, course.id]);
          }}
          onRemove={(course) => {
            setExtraCourses((prev) => prev.filter((c) => c.id !== course.id));
            setSelectedCourses((prev) => prev.filter((c) => c !== course.id));
          }}
        />
        {selectedCourses.length === allCoursesWithExtras.length ? (
          <Button onClick={onUnselectAll}>Unselect All</Button>
        ) : (
          <Button onClick={onSelectAll}>Select All</Button>
        )}
      </Flex>
      <SelectCourseView
        isLoading={allCourses.isLoading}
        error={
          allCourses.isError ? (allCourses.error as Error).message : undefined
        }
        courseList={allCoursesWithExtras}
        view={view as "list" | "grid"}
        selectedCourses={selectedCourses}
        onToggleSelection={(value) => {
          if (selectedCourses.includes(value)) {
            setSelectedCourses((prev) => prev.filter((c) => c !== value));
          } else {
            setSelectedCourses((prev) => [...prev, value]);
          }
        }}
      />
      <Flex justify="center" mt={12} pos="sticky" bottom={8} zIndex={500}>
        {selectedCourses.length > 0 && (
          <Button
            boxShadow="lg"
            w="80%"
            h="3.75rem"
            fontSize="xl"
            onClick={onOpen}
          >
            Add {selectedCourses.length} Course
            {selectedCourses.length > 1 && "s"}
          </Button>
        )}
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Add {selectedCourses.length} Course
              {selectedCourses.length > 1 && "s"}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to add {selectedCourses.length}{" "}
              {selectedCourses.length === 1 ? "course" : "courses"}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                ref={cancelRef}
                onClick={onClose}
                isDisabled={addCourses.isLoading}
              >
                Cancel
              </Button>
              <Button
                colorScheme="primary"
                isDisabled={addCourses.isLoading}
                onClick={() => {
                  onClose();
                  addCourses.mutate(
                    { courseIds: selectedCourses },
                    {
                      onSuccess: () => {
                        toast({
                          title: "Courses added successfully",
                          status: "success",
                          isClosable: true,
                        });
                        router.push(REGISTERED_COURSES);
                      },
                      onError: (error) => {
                        const err = error as Error;
                        onClose();
                        toast({
                          title: "Error adding courses",
                          description: err.message,
                          status: "error",
                          position: "top",
                          isClosable: true,
                        });
                      },
                    }
                  );
                }}
                ml={3}
              >
                {addCourses.isLoading ? <Spinner size="sm" /> : "Add"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
