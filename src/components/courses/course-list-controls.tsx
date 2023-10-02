import { useDeletionOpen } from "@/api/course/use-deletion-open";
import { Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { FC } from "react";
import { useAllSessions } from "../../api/user/use-all-sessions";
import RadioButtonGroup from "../common/radio-button-group";

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
  const allSessions = useAllSessions();
  const canDeleteInFirstSemester = useDeletionOpen({
    variables: { semester: 1 },
  });
  const canDeleteInSecondSemester = useDeletionOpen({
    variables: { semester: 2 },
  });

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
          {allSessions.data?.map((session) => (
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
              ? [
                  !canDeleteInFirstSemester.data ?? true,
                  !canDeleteInSecondSemester.data ?? true,
                ]
              : undefined
          }
        />
      </FormControl>
    </Flex>
  );
};

export default CourseListControls;
