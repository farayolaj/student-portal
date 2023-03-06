import { SimpleGrid } from "@chakra-ui/react";
import NameValueCard from "../common/name-value-card";

type ResultOverviewProps = {
  cumUnitsRegistered: number;
  cumUnitsPassed: number;
  cgpa: number;
};

export default function ResultOverview({
  cumUnitsRegistered,
  cumUnitsPassed,
  cgpa,
}: ResultOverviewProps) {
  return (
    <SimpleGrid columns={[1, null, 3]} columnGap={6}>
      <NameValueCard
        name="Cumulative Units Registered"
        value={cumUnitsRegistered}
      />
      <NameValueCard name="Cumulative Units Passed" value={cumUnitsPassed} />
      <NameValueCard name="CGPA" value={cgpa.toFixed(2)} />
    </SimpleGrid>
  );
}
