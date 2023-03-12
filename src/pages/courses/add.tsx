import {
  Flex,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useAddCourses } from "../../api/course/use-add-courses";
import { useAllCourses } from "../../api/course/use-all-courses";
import { useCourseConfig } from "../../api/course/use-course-config";
import { useSearchCourses } from "../../api/course/use-search-courses";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import AddCourseOverviewCard from "../../components/courses/add/add-course-overview-card";
import SelectCourseListControl from "../../components/courses/select/select-course-list-control";
import SelectCourseView from "../../components/courses/select/select-course-view";
import { REGISTERED_COURSES } from "../../constants/routes";
import { courses } from "../../data/courses";
import useDebounce from "../../hooks/use-debounce";

export default function AddCoursesPage(): JSX.Element {
  const [semester, setSemester] = useState(1);
  const [view, setView] = useState("list");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const courseConfig = useCourseConfig();
  const maxUnits = courseConfig.data?.find(
    (c) => c.semester === semester
  )?.maxUnits;
  const minUnits = courseConfig.data?.find(
    (c) => c.semester === semester
  )?.minUnits;

  const allCourses = useAllCourses({
    variables: { semester },
    onSuccess: (data) => {
      if (selectedCourses.length > 0) return;

      const selected = data
        .filter((course) => course.preSelected)
        .map((course) => course.id);
      setSelectedCourses(selected);
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  useSearchCourses({
    variables: { searchTerm: debouncedSearchTerm },
    onSuccess: setSearchResults,
    enabled: !!debouncedSearchTerm,
  });

  const addCourses = useAddCourses();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const router = useRouter();
  const toast = useToast();

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
        minUnits={minUnits || 0}
        maxUnits={maxUnits || 0}
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputLeftElement>
            <Icon as={IoSearchOutline} boxSize={4} />
          </InputLeftElement>
        </InputGroup>
      </Flex>
      <SelectCourseView
        isLoading={allCourses.isLoading}
        error={
          allCourses.isError ? (allCourses.error as Error).message : undefined
        }
        courseList={
          searchTerm.length === 0 ? allCourses.data || [] : searchResults
        }
        view={view as "list" | "grid"}
        selectedCourses={selectedCourses}
        onChange={setSelectedCourses}
      />
      <Flex justify="center" mt={6} pos="sticky" bottom={8}>
        {selectedCourses.length > 0 && (
          <Button boxShadow="lg" w="80%" onClick={onOpen}>
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
              Delete {selectedCourses.length} Course
              {selectedCourses.length > 1 && "s"}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to add these {selectedCourses.length}{" "}
              courses?
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
                Add
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
