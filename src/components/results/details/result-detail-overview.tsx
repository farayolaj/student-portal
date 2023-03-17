import { SimpleGrid } from "@chakra-ui/react";
import NameValueCard from "../../common/name-value-card";

type ResultDetailOverviewProps = {
  gpa: number;
  unitsRegistered: number;
  unitsPassed: number;
};

export default function ResultDetailOverview({
  gpa,
  unitsRegistered,
  unitsPassed,
}: ResultDetailOverviewProps) {
  return (
    <SimpleGrid columns={[1, null, 3]} spacing={8} mt={8}>
      <NameValueCard name="Units Registered" value={unitsRegistered} />
      <NameValueCard name="Units Passed" value={unitsPassed || "N/A"} />
      <NameValueCard
        name="Grade Point Average"
        value={gpa ? gpa.toFixed(2) : "N/A"}
      />
    </SimpleGrid>
  );
}
