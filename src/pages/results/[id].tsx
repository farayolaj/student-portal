import { useRouter } from "next/router";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import Table from "../../components/common/custom-table";
import ResultDetailOverview from "../../components/results/details/result-detail-overview";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Box,
  Button,
  chakra,
  Flex,
  Link,
  SkeletonText,
} from "@chakra-ui/react";
import { useState } from "react";
import RadioButtonGroup from "../../components/common/radio-button-group";
import ResultBarChart from "../../components/results/result-bar-chart";
import { useSingleResultSession } from "@/api/result/use-single-result-session";
import { useResult } from "@/api/result/use-result";
import { useResultPrintUrl } from "@/api/result/use-result-print-url";

const columnHelper = createColumnHelper<CourseResult>();

const columns = [
  columnHelper.accessor("code", { header: "Course Code" }),
  columnHelper.accessor("title", { header: "Course Title" }),
  columnHelper.accessor("units", { header: "Units" }),
  columnHelper.accessor("status", { header: "Status" }),
  columnHelper.accessor("totalScore", { header: "Marks" }),
  columnHelper.accessor("grade", { header: "GP" }),
  columnHelper.accessor((row) => row.units * row.grade, { header: "WGP" }),
  columnHelper.accessor("remark", {
    header: "Remark",
    cell: (row) => (
      <chakra.span textTransform="capitalize">
        {row.getValue() === "pass" ? "Passed" : "Failed"}
      </chakra.span>
    ),
  }),
];

export default function ResultDetailPage() {
  const { query } = useRouter();
  const sessionId = query.id as string;
  const [semester, setSemester] = useState(0);
  const resultSession = useSingleResultSession(sessionId);
  const { data: result } = useResult({
    variables: {
      session: resultSession as ResultSession,
    },
    enabled: !!resultSession,
  });
  // const printUrl = useResultPrintUrl(sessionId);
  const printUrl = useResultPrintUrl(sessionId);

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

  const gpa = (
    allResults.reduce((total, cr) => total + cr.grade * cr.units, 0) /
      unitsRegistered || 0
  ).toFixed(2);

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
      <Flex justify="space-between" mb={8}>
        <Button
          onClick={() => {
            window.open(printUrl.url as string);
          }}
          isDisabled={printUrl.isLoading && !printUrl.error}
        >
          Print Result
        </Button>
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
