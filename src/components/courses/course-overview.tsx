import { SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import NameValueCard from "../common/name-value-card";

type CourseOverviewProps = {
  maxUnits: number;
  minUnits: number;
  registeredUnits: number;
  coursesRegistered: number;
};

const CourseOverview: FC<CourseOverviewProps> = ({
  maxUnits,
  coursesRegistered,
  minUnits,
  registeredUnits,
}) => {
  return (
    <SimpleGrid columns={[1, null, 4]} columnGap={6}>
      <NameValueCard name="Minimum Units" value={minUnits} />
      <NameValueCard name="Maximum Units" value={maxUnits} />
      <NameValueCard name="Registered Units" value={registeredUnits} />
      <NameValueCard name="Registered Courses" value={coursesRegistered} />
    </SimpleGrid>
  );
};

export default CourseOverview;
