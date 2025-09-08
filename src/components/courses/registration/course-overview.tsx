import { Box, SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import NameValueCard from "../../common/name-value-card";

type CourseOverviewProps = {
  maxUnits: number;
  minUnits: number;
  registeredUnits: number;
  coursesRegistered: number;
  minMaxActive: boolean;
};

const CourseOverview: FC<CourseOverviewProps> = ({
  maxUnits,
  coursesRegistered,
  minUnits,
  registeredUnits,
  minMaxActive,
}) => {
  return (
    <SimpleGrid columns={[1, null, 4]} columnGap={6}>
      <Box filter={minMaxActive ? "initial" : "grayscale(100%)"}>
        <NameValueCard name="Minimum Units" value={minUnits} />
      </Box>
      <Box filter={minMaxActive ? "initial" : "grayscale(100%)"}>
        <NameValueCard name="Maximum Units" value={maxUnits} />
      </Box>
      <NameValueCard name="Registered Units" value={registeredUnits} />
      <NameValueCard name="Registered Courses" value={coursesRegistered} />
    </SimpleGrid>
  );
};

export default CourseOverview;
