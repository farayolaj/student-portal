import { SimpleGrid } from "@chakra-ui/react";

import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import ResultOverview from "../../components/results/result-overview";
import ResultSummary from "../../components/results/result-summary";

export default function Results() {
  return (
    <>
      <Seo title="Results" />
      <PageTitle showBackButton>Results</PageTitle>
      <ResultOverview
        cgpa={3.69}
        cumUnitsRegistered={102}
        cumUnitsPassed={102}
      />
      <SimpleGrid mt={8} columns={[1, null, 4]} gap={8}>
        <ResultSummary id="1" session="2019/2020" />
        <ResultSummary id="2" session="2019/2020" />
        <ResultSummary id="3" session="2020/2021" />
        <ResultSummary id="4" session="2020/2021" />
        <ResultSummary id="5" session="2021/2022" />
      </SimpleGrid>
    </>
  );
}
