import { Flex, Card, SimpleGrid, Text, CardBody } from "@chakra-ui/react";
import { FC } from "react";
import CourseOverviewCardItem from "../course-overview-card-item";

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
      <CourseOverviewCardItem name="Min Units" value={minUnits} />
      <CourseOverviewCardItem name="Max Units" value={maxUnits} />
      <CourseOverviewCardItem name="Total Selected Units" value={totalUnits} />
      <CourseOverviewCardItem
        name="Selected Courses"
        value={selectedCourses.length}
      />
    </SimpleGrid>
  );
};

export default AddCourseOverviewCard;
