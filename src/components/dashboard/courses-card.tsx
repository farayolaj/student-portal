import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

const CoursesCard: FC = () => {
  return (
    <Card mt={8}>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading as="h2" fontSize="md">
          Courses
        </Heading>
        <Text as="span">
          <Link as={NextLink} href="#">
            See other courses &rarr;
          </Link>
        </Text>
      </CardHeader>
      <CardBody>
        <SimpleGrid columns={[2, null, null, 6]}>
          <CourseItem code="GES 101" title="Use of English" units={4} />
          <CourseItem code="GES 101" title="Use of English" units={4} />
          <CourseItem code="GES 101" title="Use of English" units={4} />
          <CourseItem code="GES 101" title="Use of English" units={4} />
          <CourseItem code="GES 101" title="Use of English" units={4} />
          <CourseItem code="GES 101" title="Use of English" units={4} />
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

type CourseItemProps = {
  code: string;
  title: string;
  units: number;
};

const CourseItem: FC<CourseItemProps> = ({ code, title, units }) => {
  return (
    <VStack>
      <Text fontWeight="bold" color="primary.500">
        {code}
      </Text>
      <Text>{title}</Text>
      <Text fontSize="sm">{units} Units</Text>
    </VStack>
  );
};

export default CoursesCard;
