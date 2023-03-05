import { Flex, Card, SimpleGrid, Text, CardBody } from "@chakra-ui/react";
import { FC } from "react";

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
      <CourseOverviewCard name="Min Units" value={minUnits} />
      <CourseOverviewCard name="Max Units" value={maxUnits} />
      <CourseOverviewCard name="Registered Units" value={registeredUnits} />
      <CourseOverviewCard name="Registered Courses" value={coursesRegistered} />
    </SimpleGrid>
  );
};

export default CourseOverview;

type CourseOverviewCardProps = {
  name: string;
  value: number;
};

const CourseOverviewCard: FC<CourseOverviewCardProps> = ({ name, value }) => {
  return (
    <Card>
      <CardBody
        display="flex"
        flexDirection="row-reverse"
        justifyContent="flex-end"
        alignItems="center"
        gap={3}
      >
        <Text fontSize="sm" fontWeight="bold" w="min-content">
          {name}
        </Text>
        <Flex
          p={4}
          bg="primary.200"
          boxSize={12}
          justify="center"
          align="center"
          borderRadius="full"
        >
          <Text fontSize="lg" fontWeight="bold">
            {value}
          </Text>
        </Flex>
      </CardBody>
    </Card>
  );
};
