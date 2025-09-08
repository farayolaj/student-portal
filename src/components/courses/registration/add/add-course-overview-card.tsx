import { SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import NameValueCard from "../../../common/name-value-card";

type AddCourseOverviewProps = {
  maxUnits: number;
  minUnits: number;
  selectedCourses: Course[];
};

const AddCourseOverviewCard: FC<AddCourseOverviewProps> = ({
  maxUnits,
  selectedCourses,
  minUnits,
}) => {
  const totalUnits = selectedCourses.reduce(
    (total, course) => total + course.units,
    0
  );

  return (
    <SimpleGrid mt={8} columns={[1, null, 4]} columnGap={6}>
      <NameValueCard name="Minimum Units" value={minUnits} />
      <NameValueCard name="Maximum Units" value={maxUnits} />
      <NameValueCard name="Total Selected Units" value={totalUnits} />
      <NameValueCard name="Selected Courses" value={selectedCourses.length} />
    </SimpleGrid>
  );
};

export default AddCourseOverviewCard;
