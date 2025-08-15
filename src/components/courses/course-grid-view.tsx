import {
  AspectRatio,
  Button,
  Card,
  CardBody,
  Flex,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as routes from "../../constants/routes";
import getAbstractImage from "../../lib/get-abstract-image";
import statusCodeToName from "../../lib/status-code-to-name";

type CourseGridViewProps = {
  courseList: Course[];
};

const CourseGridView: FC<CourseGridViewProps> = ({ courseList }) => {
  return (
    <SimpleGrid columns={[1, null, 2, null, 3]} gap={8}>
      {courseList.map((course) => (
        <ActiveCourseGridViewItem key={course.id} course={course} />
      ))}
    </SimpleGrid>
  );
};

export default CourseGridView;

type ActiveCourseGridViewItemProps = {
  course: Course;
};

const ActiveCourseGridViewItem: FC<ActiveCourseGridViewItemProps> = ({
  course,
}) => {
  const isMobile = useBreakpointValue(
    { base: true, md: false },
    { fallback: undefined }
  );
  const router = useRouter();
  return (
    <LinkBox
      as={Card}
      rounded="lg"
      overflow="hidden"
      textDecoration="none"
      _hover={{
        "& img": { filter: "auto", brightness: "60%" },
        transform: "translateY(-4px)",
        boxShadow: "lg",
        textDecoration: "none",
      }}
      transition="all 0.2s"
      title="Click to view course page"
    >
      <AspectRatio pos="relative" w="full" ratio={3 / 2} overflow="hidden">
        <div>
          <Image
            src={getAbstractImage(course.id)}
            alt=""
            role="presentation"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
      </AspectRatio>
      <CardBody>
        <Flex direction="column" gap={4}>
          <Flex direction="column" gap={2}>
            <Text fontSize="sm" color="gray.500" fontWeight="semibold">
              {course.code}
            </Text>
            <LinkOverlay
              as={Link}
              href={
                isMobile
                  ? "#"
                  : routes.COURSE_DETAIL.replace("[courseId]", course.id)
              }
            >
              <Text fontWeight="bold" noOfLines={2} lineHeight="shorter">
                {course.title}
              </Text>
            </LinkOverlay>
            {course.lecturer && (
              <Text fontSize="sm" color="gray.600">
                {course.lecturer}
              </Text>
            )}
          </Flex>
          <Spacer />
          <Flex justify="space-between" align="center">
            <Text fontSize="sm" color="gray.500">
              {course.units} Unit{course.units > 1 && "s"}
            </Text>
            <Text fontSize="sm" color="green.500" fontWeight="semibold">
              {statusCodeToName(course.status)}
            </Text>
          </Flex>
          <Spacer />
          {isMobile && (
            <Button
              variant="outline"
              onClick={() =>
                router.push(
                  routes.COURSE_DETAIL.replace("[courseId]", course.id)
                )
              }
            >
              View Course
            </Button>
          )}
        </Flex>
      </CardBody>
    </LinkBox>
  );
};
