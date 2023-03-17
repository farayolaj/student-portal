import { useResult } from "@/api/result/use-result";
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

type ResultSummaryProps = {
  sessionResultSummary: SessionResultSummary;
};

export default function ResultSummary({
  sessionResultSummary,
}: ResultSummaryProps) {
  return (
    <LinkBox
      as={Card}
      borderWidth="2px"
      borderColor="transparent"
      _hover={{
        borderColor: "primary",
      }}
    >
      <ResultBarChart w="full" courseResults={sessionResultSummary.results} />
      <CardBody>
        <Flex direction="column">
          <LinkOverlay
            as={NextLink}
            w="fit-content"
            alignSelf="center"
            href={`/results/${sessionResultSummary.session.id}`}
          >
            <Text as="span" fontSize="xl" fontWeight="bold">
              {sessionResultSummary.session.name}
            </Text>
          </LinkOverlay>
        </Flex>
      </CardBody>
    </LinkBox>
  );
}
