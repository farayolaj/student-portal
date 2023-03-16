import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useState, useRef } from "react";
import SelectCourseListView from "../select/select-course-list-view";
import SelectCourseGridView from "../select/select-course-grid-view";

type DeleteCourseViewProps = {
  view: "list" | "grid";
  courseList: Course[];
  onDelete: (ids: string[]) => void;
};

const DeleteCourseView: FC<DeleteCourseViewProps> = ({
  view,
  courseList,
  onDelete,
}) => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { fallback: undefined }
  );
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const onToggleSelection = (id: string) => {
    if (selectedCourses.includes(id)) {
      setSelectedCourses((prev) => prev.filter((c) => c !== id));
    } else {
      setSelectedCourses((prev) => [...prev, id]);
    }
  };

  const onSelectAll = () => {
    setSelectedCourses(courseList.map((course) => course.id));
  };

  const onUnselectAll = () => {
    setSelectedCourses([]);
  };

  if (isMobile === null) return null;

  return (
    <>
      <Flex mt={8} justify="flex-end">
        {selectedCourses.length === courseList.length ? (
          <Button onClick={onUnselectAll}>Unselect All</Button>
        ) : (
          <Button onClick={onSelectAll}>Select All</Button>
        )}
      </Flex>
      <Box mt={8}>
        {isMobile ? (
          <SelectCourseGridView
            courseList={courseList}
            selectedCourses={selectedCourses}
            onToggleSelection={onToggleSelection}
            colorScheme="red"
          />
        ) : view == "grid" ? (
          <SelectCourseGridView
            courseList={courseList}
            selectedCourses={selectedCourses}
            onToggleSelection={onToggleSelection}
            colorScheme="red"
          />
        ) : (
          <SelectCourseListView
            courseList={courseList}
            selectedCourses={selectedCourses}
            onToggleSelection={onToggleSelection}
            colorScheme="red"
          />
        )}
      </Box>
      <Flex justify="center" mt={6} pos="sticky" bottom={8}>
        {selectedCourses.length > 0 && (
          <Button boxShadow="lg" w="80%" colorScheme="red" onClick={onOpen}>
            Delete {selectedCourses.length} Course
            {selectedCourses.length > 1 && "s"}
          </Button>
        )}
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {selectedCourses.length} Course
              {selectedCourses.length > 1 && "s"}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete these courses?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  onDelete(selectedCourses);
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteCourseView;
