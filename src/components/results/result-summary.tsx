import {
  Card,
  CardBody,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import ResultBarChart from "./result-bar-chart";

const courseResults: CourseResult[] = [
  {
    id: "CSC 101",
    title: "Introduction to Computer Science",
    status: "Required",
    marks: 70,
    gp: 3,
    units: 4,
  },
  {
    id: "CSC 102",
    title: "Introduction to Programming Languages",
    status: "Required",
    marks: 60,
    gp: 4,
    units: 4,
  },
  {
    id: "CSC 103",
    title: "Introduction to Embedded Systems",
    status: "Required",
    marks: 49,
    gp: 1,
    units: 3,
  },
  {
    id: "CSC 104",
    title: "Introduction to Operating Systems",
    status: "Required",
    marks: 90,
    gp: 4,
    units: 4,
  },
  {
    id: "CSC 105",
    title: "Introduction to Computer Graphics",
    status: "Required",
    marks: 40,
    gp: 4,
    units: 4,
  },
  {
    id: "CSC 106",
    title: "Introduction to Computer Graphics",
    status: "Required",
    marks: 76,
    gp: 4,
    units: 4,
  },
  {
    id: "CSC 107",
    title: "Introduction to Computer Graphics",
    status: "Required",
    marks: 78,
    gp: 4,
    units: 4,
  },
  {
    id: "CSC 108",
    title: "Introduction to Computer Graphics",
    status: "Required",
    marks: 70,
    gp: 4,
    units: 4,
  },
  {
    id: "CSC 109",
    title: "Introduction to Computer Graphics",
    status: "Required",
    marks: 77,
    gp: 4,
    units: 4,
  },
  {
    id: "CSC 110",
    title: "Introduction to Computer Graphics",
    status: "Required",
    marks: 79,
    gp: 4,
    units: 4,
  },
  {
    id: "CSC 111",
    title: "Introduction to Computer Graphics",
    status: "Required",
    marks: 68,
    gp: 4,
    units: 4,
  },
];

type ResultSummaryProps = {
  id: string;
  session: string;
};

export default function ResultSummary({ id, session }: ResultSummaryProps) {
  return (
    <LinkBox
      as={Card}
      borderWidth="2px"
      borderColor="transparent"
      _hover={{
        borderColor: "primary",
      }}
    >
      <ResultBarChart w="full" courseResults={courseResults} />
      <CardBody>
        <Flex direction="column">
          <LinkOverlay
            as={NextLink}
            w="fit-content"
            alignSelf="center"
            href={`/results/${id}`}
          >
            <Text as="span" fontSize="xl" fontWeight="bold">
              {session}
            </Text>
          </LinkOverlay>
        </Flex>
      </CardBody>
    </LinkBox>
  );
}
