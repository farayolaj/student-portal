import { Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { courseQueries } from "../../../api/course.queries";
import { userQueries } from "../../../api/user.queries";
import RadioButtonGroup from "../../common/radio-button-group";

type CourseListControlsProps = {
  sessionId: string;
  onSessionIdChange: (session: string) => void;
  semester: number;
  onSemesterChange: (filter: number) => void;
  inDeleteView?: boolean;
};

const CourseListControls: FC<CourseListControlsProps> = ({
  sessionId,
  onSessionIdChange,
  semester,
  onSemesterChange,
  inDeleteView,
}) => {
  const { data: allSessions } = useQuery(userQueries.sessions());
  const { data: canDeleteInFirstSemester } = useQuery(
    courseQueries.deletionOpenBy(1)
  );
  const { data: canDeleteInSecondSemester } = useQuery(
    courseQueries.deletionOpenBy(2)
  );

  return (
    <Flex
      w="full"
      direction={["column", "row"]}
      justify="space-between"
      rowGap={4}
      align="center"
      mb={8}
    >
      <FormControl w="fit-content">
        <FormLabel srOnly>Session</FormLabel>
        <Select
          value={sessionId}
          onChange={(e) => onSessionIdChange(e.target.value)}
          w="12rem"
          variant="filled"
          bg="white"
          _hover={{
            bg: "primary.50",
          }}
        >
          {allSessions?.map((session) => (
            <option key={session.id} value={session.id}>
              {session.name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl w="fit-content">
        <FormLabel srOnly>Semester</FormLabel>
        <RadioButtonGroup
          values={["1", "2"]}
          labels={["1st Semester", "2nd Semester"]}
          value={Number(semester).toString()}
          onChange={(e) => onSemesterChange(parseInt(e))}
          isEachDisabled={
            inDeleteView
              ? [!canDeleteInFirstSemester, !canDeleteInSecondSemester]
              : undefined
          }
        />
      </FormControl>
    </Flex>
  );
};

export default CourseListControls;
