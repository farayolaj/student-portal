import { Flex, Spacer, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { IoGrid, IoList } from "react-icons/io5";
import { courseQueries } from "../../../../api/course.queries";
import RadioButtonGroup from "../../../common/radio-button-group";

type SelectCourseListControlProps = {
  session: string;
  semester: number;
  onSemesterChange: (filter: number) => void;
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
  const { data: canRegisterFirstSemester } = useQuery(
    courseQueries.registrationOpenBy(1)
  );
  const { data: canRegisterSecondSemester } = useQuery(
    courseQueries.registrationOpenBy(2)
  );

  return (
    <>
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
          values={["1", "2"]}
          labels={["1st Semester", "2nd Semester"]}
          value={Number(semester).toString()}
          onChange={(s) => onSemesterChange(parseInt(s))}
          isEachDisabled={[
            !canRegisterFirstSemester,
            !canRegisterSecondSemester,
          ]}
        />
      </Flex>
    </>
  );
}
