import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  StackDivider,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useSearchCourses } from "../../../api/course/use-search-courses";
import useDebounce from "../../../hooks/use-debounce";
import statusCodeToName from "../../../lib/status-code-to-name";

type AddMoreCoursesModalProps = {
  onAdd: (course: Course) => void;
  onRemove: (course: Course) => void;
};

export default function AddMoreCoursesModal({
  onAdd,
  onRemove,
}: AddMoreCoursesModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  useSearchCourses({
    variables: { searchTerm: debouncedSearchTerm },
    onSuccess: setSearchResults,
    enabled: !!debouncedSearchTerm,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const selectCourse = (course: Course) => {
    setSelectedCourses((prev) => [...prev, course]);
    onAdd(course);
  };

  const unselectCourse = (course: Course) => {
    setSelectedCourses((prev) => prev.filter((c) => c.id !== course.id));
    onRemove(course);
  };

  const includesCourse = (course: Course) =>
    selectedCourses.some((c) => c.id === course.id);

  return (
    <>
      <Button onClick={onOpen}>Add More Courses</Button>{" "}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent overflow="hidden">
          <ModalBody>
            <VStack align="stretch" spacing={8} pos="relative">
              <Flex
                justify="space-between"
                pos="sticky"
                top={0}
                bg="white"
                zIndex={100}
              >
                <InputGroup pr={0} w={80} variant="primary">
                  <Input
                    variant="outline"
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
                <ModalCloseButton />
              </Flex>
              <VStack align="stretch" divider={<StackDivider />}>
                {searchResults.map((course) => (
                  <CourseItem
                    key={course.id}
                    course={course}
                    selected={includesCourse(course)}
                    onSelect={selectCourse}
                    onUnselect={unselectCourse}
                  />
                ))}
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

type CourseItemProps = {
  course: Course;
  selected: boolean;
  onSelect: (course: Course) => void;
  onUnselect: (course: Course) => void;
};

function CourseItem({
  course,
  selected,
  onSelect,
  onUnselect,
}: CourseItemProps) {
  return (
    <Flex>
      <VStack spacing={2} align="flex-start" justify="center" w="full">
        <Text
          as="span"
          fontWeight="bold"
          fontSize="sm"
          textTransform="uppercase"
        >
          {course.code}
        </Text>
        <Text as="span">{course.title}</Text>
        <Text fontSize="sm">
          {statusCodeToName(course.status)} - {course.units}{" "}
          {course.units > 1 ? "units" : "unit"}
        </Text>
      </VStack>
      {selected ? (
        <Button onClick={() => onUnselect(course)}>Remove</Button>
      ) : (
        <Button variant="outline" onClick={() => onSelect(course)}>
          Add
        </Button>
      )}
    </Flex>
  );
}
