import { Flex, Spacer, Text } from "@chakra-ui/react";
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
  return (
    <Flex
      direction={["column", null, "row"]}
      rowGap={4}
      align="center"
      justify="space-between"
    >
      <RadioButtonGroup
        display={["none", null, "flex"]}
        options={[<IoList key="list" />, <IoGrid key="grid" />]}
        labels={["List View", "Grid View"]}
        values={["list", "grid"]}
        value={view}
        onChange={onViewChange}
      />
      <Spacer display={["none", null, "unset"]} />
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
