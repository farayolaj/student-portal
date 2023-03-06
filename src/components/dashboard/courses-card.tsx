import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { FC } from "react";
import * as routes from "../../constants/routes";

const courses: Course[] = [
  {
    id: "GES 102",
    title: "Use of English",
    description:
      "Reprehenderit occaecat irure voluptate et nostrud. Aliqua commodo officia velit cupidatat cupidatat. Dolore aliqua sint officia ad consequat veniam quis. Nisi adipisicing in dolor enim sit excepteur enim eu esse Lorem ad. Est duis qui sint mollit.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 2,
    status: "Required",
    materialLink: "#",
  },
  {
    id: "GES 103",
    title: "Use of English",
    description:
      "Culpa fugiat voluptate consequat in laboris enim magna. Esse eiusmod adipisicing est do duis ex Lorem. Occaecat eu id commodo reprehenderit voluptate laboris.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 1,
    status: "Required",
    materialLink: "#",
  },
  {
    id: "GES 104",
    title: "Use of English",
    description:
      "Est occaecat labore eu sit elit ex culpa. Cillum magna aute eiusmod cillum qui. Magna in aute minim adipisicing nulla in aliquip occaecat officia exercitation non id incididunt. Sunt aute ex culpa ad culpa. Irure ullamco consectetur reprehenderit dolor aute.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 1,
    status: "Required",
    materialLink: "#",
  },
  {
    id: "GES 105",
    title: "African Culture and Civilisation",
    description:
      "Amet enim incididunt magna commodo. Laboris ex mollit elit ut dolor duis consequat exercitation in eiusmod occaecat ullamco dolor. Id est exercitation adipisicing eiusmod irure labore in duis.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 2,
    status: "Required",
    materialLink: "#",
  },
  {
    id: "GES 106",
    title: "Government, Politics and Administration",
    description:
      "Sint ea anim dolor commodo velit. Proident ipsum amet non non mollit voluptate laborum elit. Labore anim dolor enim occaecat. Labore fugiat nulla labore sunt eu. Sint ut excepteur ad nisi officia Lorem duis veniam qui.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 2,
    status: "Required",
    materialLink: "#",
  },
  {
    id: "GES 107",
    title: "Use of English",
    description:
      "Occaecat sunt nostrud ad exercitation in sit ad excepteur aute id ad minim. Eu irure id incididunt excepteur labore officia fugiat do fugiat sunt. Magna exercitation anim laboris ipsum occaecat in quis.",
    units: 3,
    image: "/images/pc.png",
    lecturer: "Dr. John Doe",
    semester: 1,
    status: "Required",
    materialLink: "#",
  },
];

const CoursesCard: FC = () => {
  return (
    <Card mt={8}>
      <CardHeader display="flex" justifyContent="space-between">
        <Heading as="h2" fontSize="md">
          Courses
        </Heading>
        <Text as="span">
          <Link as={NextLink} href={routes.REGISTERED_COURSES}>
            See other courses &rarr;
          </Link>
        </Text>
      </CardHeader>
      <CardBody>
        <SimpleGrid gap={4} columns={[2, null, null, 4]}>
          {courses.slice(0, 4).map((course) => (
            <CourseItem
              key={course.id}
              code={course.id}
              title={course.title}
              units={course.units}
              image={course.image}
            />
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
};

type CourseItemProps = {
  code: string;
  title: string;
  units: number;
  image: string;
};

const CourseItem: FC<CourseItemProps> = ({ code, title, units, image }) => {
  return (
    <Box pos="relative" rounded="md" overflow="hidden">
      <Box pos="absolute" w="full" h="full">
        <Image src={image} alt="Abstract image" role="presentation" fill />
      </Box>
      <VStack
        w="full"
        h="full"
        p={2}
        pos="relative"
        bgColor="blackAlpha.700"
        color="white"
      >
        <Text fontWeight="bold" color="primary.400">
          {code}
        </Text>
        <Text textAlign="center">{title}</Text>
        <Spacer />
        <Text fontSize="sm">{units} Units</Text>
      </VStack>
    </Box>
  );
};

export default CoursesCard;
