import { Flex, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { FC } from "react";
import RadioButtonGroup from "../common/radio-button-group";

type CourseListControlsProps = {
  session: string;
  onSessionChange: (session: string) => void;
  semester: string;
  onSemesterChange: (filter: string) => void;
};

const CourseListControls: FC<CourseListControlsProps> = ({
  session,
  onSessionChange,
  semester,
  onSemesterChange,
}) => {
  return (
    <Flex
      w="full"
      direction={["column", "row"]}
      justify="space-between"
      align="center"
      mt={2}
      mb={8}
    >
      <FormControl w="fit-content">
        <FormLabel srOnly>Session</FormLabel>
        <Select
          value={session}
          onChange={(e) => onSessionChange(e.target.value)}
          w="12rem"
          variant="filled"
          bg="white"
          _hover={{
            bg: "primary.50",
          }}
        >
          <option value="2020-2021">2020-2021</option>
          <option value="2021-2022">2021-2022</option>
          <option value="2022-2023">2022-2023</option>
        </Select>
      </FormControl>
      <FormControl w="fit-content">
        <FormLabel srOnly>Semester</FormLabel>
        <RadioButtonGroup
          values={["all", "first", "second"]}
          labels={["All", "First Semester", "Second Semester"]}
          value={semester}
          onChange={(e) => onSemesterChange(e)}
        />
      </FormControl>
    </Flex>
  );
};

export default CourseListControls;
