import { Card, CardBody, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

type ResultSummaryProps = {
  id: string;
  session: string;
  semester: string;
  gpa: number;
};

export default function ResultSummary({
  id,
  session,
  semester,
  gpa,
}: ResultSummaryProps) {
  return (
    <Card>
      <CardBody>
        <Flex direction="column">
          <Text fontSize="xl" fontWeight="bold">
            {session}
          </Text>
          <Text fontWeight="semibold">{semester}</Text>
          <Text fontSize="sm" mt={4}>
            GPA: {gpa.toFixed(2)}
          </Text>
          <Link
            mt={6}
            as={NextLink}
            w="fit-content"
            alignSelf="center"
            href={`/results/${id}`}
            variant="button"
          >
            View Result
          </Link>
        </Flex>
      </CardBody>
    </Card>
  );
}
