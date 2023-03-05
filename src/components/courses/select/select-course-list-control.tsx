import { Flex, Spacer, Text, useBreakpointValue } from "@chakra-ui/react";
import { IoList, IoGrid } from "react-icons/io5";
import RadioButtonGroup from "../../common/radio-button-group";

type SelectCourseListControlProps = {
  session: string;
  semester: string;
  onSemesterChange: (filter: string) => void;
  view: string;
  onViewChange: (view: string) => void;
};

export default function SelectCourseListControl({
  session,
  semester,
  onSemesterChange,
  view,
  onViewChange,
}: SelectCourseListControlProps) {
  const useGridOnly = useBreakpointValue([true, null, false]);

  return (
    <Flex
      direction={["column", null, "row"]}
      rowGap={4}
      align="center"
      justify="space-between"
      mt={6}
    >
      {!useGridOnly && (
        <>
          <RadioButtonGroup
            options={[<IoList key="list" />, <IoGrid key="grid" />]}
            labels={["List View", "Grid View"]}
            values={["list", "grid"]}
            value={view}
            onChange={onViewChange}
          />
          <Spacer />{" "}
        </>
      )}
      {/* <InputGroup pr={0} w={72} variant="primary">
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
  </InputGroup> */}
      <Text fontSize="lg" fontWeight="semibold">
        {session} Session
      </Text>
      <Spacer />
      <RadioButtonGroup
        values={["all", "first", "second"]}
        labels={["All", "1st Semester", "2nd Semester"]}
        value={semester}
        onChange={onSemesterChange}
      />
    </Flex>
  );
}
