import { Flex, Card, SimpleGrid, Text, CardBody } from "@chakra-ui/react";
import { FC } from "react";
import CourseOverviewCardItem from "./course-overview-card-item";

type CourseOverviewProps = {
  maxUnits: number;
  minUnits: number;
  registeredUnits: number;
  coursesRegistered: number;
};

const CourseOverviewCard: FC<CourseOverviewProps> = ({
  maxUnits,
  coursesRegistered,
  minUnits,
  registeredUnits,
}) => {
  return (
    <SimpleGrid columns={[1, null, 4]} columnGap={6}>
      <CourseOverviewCardItem name="Min Units" value={minUnits} />
      <CourseOverviewCardItem name="Max Units" value={maxUnits} />
      <CourseOverviewCardItem name="Registered Units" value={registeredUnits} />
      <CourseOverviewCardItem
        name="Registered Courses"
        value={coursesRegistered}
      />
    </SimpleGrid>
  );
};

export default CourseOverviewCard;
