import { useAllResults } from "@/api/result/use-all-results";
import { SimpleGrid } from "@chakra-ui/react";

import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import ResultOverview from "../../components/results/result-overview";
import ResultSummary from "../../components/results/result-summary";

export default function Results() {
  const { data: allResults = [] } = useAllResults({
    select: (data) =>
      data.filter(
        (item) =>
          !item.session.id.includes("20") && !item.session.id.includes("22")
      ),
  });
  const totalUnitsRegistered = allResults.reduce((acc, session) => {
    return (
      acc +
      session.results.reduce((acc, result) => {
        return acc + result.units;
      }, 0)
    );
  }, 0);
  const totalUnitsPassed = allResults.reduce((acc, session) => {
    return (
      acc +
      session.results.reduce((acc, result) => {
        return acc + (result.remark === "pass" ? result.units : 0);
      }, 0)
    );
  }, 0);

  return (
    <>
      <Seo title="Results" />
      <PageTitle showBackButton>Results</PageTitle>
      <ResultOverview
        cgpa={NaN}
        cumUnitsRegistered={totalUnitsRegistered}
        cumUnitsPassed={totalUnitsPassed}
      />
      <SimpleGrid mt={8} columns={[1, null, 4]} gap={8}>
        {allResults.map((sessionResult) => (
          <ResultSummary
            key={sessionResult.session.id}
            sessionResultSummary={sessionResult}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
