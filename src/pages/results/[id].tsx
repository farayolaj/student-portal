import { Box, chakra, Flex, SkeletonText } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useState } from "react";
import { resultQueries } from "../../api/result.queries";
import Table from "../../components/common/custom-table";
import PageTitle from "../../components/common/page-title";
import RadioButtonGroup from "../../components/common/radio-button-group";
import Seo from "../../components/common/seo";
import ResultDetailOverview from "../../components/results/details/result-detail-overview";
import ResultBarChart from "../../components/results/result-bar-chart";

const columnHelper = createColumnHelper<CourseResult>();

const columns = [
  columnHelper.accessor("code", { header: "Course Code" }),
  columnHelper.accessor("title", { header: "Course Title" }),
  columnHelper.accessor("units", { header: "Units" }),
  columnHelper.accessor("status", { header: "Status" }),
  columnHelper.accessor("totalScore", {
    header: "Marks",
    cell: (row) => (!!row.getValue() ? row.getValue() : "N/A"),
  }),
  columnHelper.accessor("grade", {
    header: "GP",
    cell: (row) => (!!row.getValue() ? row.getValue() : "N/A"),
  }),
  columnHelper.accessor((row) => row.units * row.grade, {
    header: "WGP",
    cell: (row) => (!!row.getValue() ? row.getValue() : "N/A"),
  }),
  columnHelper.accessor("remark", {
    header: "Remark",
    cell: (row) => {
      if (!row.row.original.totalScore) return "N/A";
      return (
        <chakra.span textTransform="capitalize">
          {row.getValue() === "pass" ? "Passed" : "Failed"}
        </chakra.span>
      );
    },
  }),
];

export default function ResultDetailPage() {
  const { query } = useRouter();
  const sessionId = query.id as string;
  const [semester, setSemester] = useState(0);
  const { data: resultSession } = useQuery({
    ...resultQueries.sessions(),
    select: (data) => data.find((session) => session.id === sessionId),
  });
  const { data: result } = useQuery({
    ...resultQueries.detailsBy(resultSession as ResultSession),
    enabled: !!resultSession,
  });

  let allResults: CourseResult[];
  let unitsRegistered: number;
  let unitsPassed: number;

  if (semester === 0) {
    allResults = [
      ...(result?.firstSemester?.courses || []),
      ...(result?.secondSemester?.courses || []),
    ];
    unitsRegistered =
      (result?.firstSemester?.unitsRegistered || 0) +
      (result?.secondSemester?.unitsRegistered || 0);
    unitsPassed =
      (result?.firstSemester?.unitsPassed || 0) +
      (result?.secondSemester?.unitsPassed || 0);
  } else if (semester === 1) {
    allResults = result?.firstSemester?.courses || [];
    unitsRegistered = result?.firstSemester?.unitsRegistered || 0;
    unitsPassed = result?.firstSemester?.unitsPassed || 0;
  } else {
    allResults = result?.secondSemester?.courses || [];
    unitsRegistered = result?.secondSemester?.unitsRegistered || 0;
    unitsPassed = result?.secondSemester?.unitsPassed || 0;
  }

  const gpa =
    allResults.reduce((total, cr) => total + cr.grade * cr.units, 0) /
      unitsRegistered || 0;

  return (
    <>
      <Seo title="Result Details" />
      <PageTitle showBackButton>
        {resultSession?.name ? (
          `${resultSession.name} Session Result`
        ) : (
          <SkeletonText />
        )}
      </PageTitle>
      <Flex justify="flex-end" mb={8} wrap="wrap" gap={4}>
        <RadioButtonGroup
          labels={["All", "1st Semester", "2nd Semester"]}
          values={["0", "1", "2"]}
          value={Number(semester).toString()}
          onChange={(value) => setSemester(parseInt(value))}
        />
      </Flex>
      <ResultBarChart
        courseResults={allResults.map((cr) => ({
          courseCode: cr.code,
          remark: cr.remark,
          units: cr.units,
          totalScore: cr.totalScore,
        }))}
        display="flex"
        w="full"
        justifyContent="center"
        h={40}
        showAxes
      />
      <ResultDetailOverview
        gpa={gpa}
        unitsRegistered={unitsRegistered}
        unitsPassed={unitsPassed}
      />
      <Box mt={8}>
        <Table
          columns={columns}
          data={allResults}
          defaultColumn={{
            cell: (props) => (
              <Box
                textAlign={
                  typeof props.getValue() === "number" ? "right" : "initial"
                }
              >
                {props.getValue() as any}
              </Box>
            ),
          }}
        />
      </Box>
    </>
  );
}
