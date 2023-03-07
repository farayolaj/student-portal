import { useRouter } from "next/router";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import Table from "../../components/common/custom-table";
import ResultDetailOverview from "../../components/results/details/result-detail-overview";
import { createColumnHelper } from "@tanstack/react-table";
import { Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
import RadioButtonGroup from "../../components/common/radio-button-group";
import ResultBarChart from "../../components/results/result-bar-chart";

const result: Result = {
  id: "1",
  session: "2019/2020",
  firstSemester: {
    unitsRegistered: 8,
    unitsPassed: 7,
    courses: [
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
        marks: 90,
        gp: 4,
        units: 4,
      },
    ],
  },
  secondSemester: {
    unitsRegistered: 7,
    unitsPassed: 5,
    courses: [
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
    ],
  },
};

const columnHelper = createColumnHelper<CourseResult>();

const columns = [
  columnHelper.accessor("id", { header: "Course Code" }),
  columnHelper.accessor("title", { header: "Course Title" }),
  columnHelper.accessor("units", { header: "Units" }),
  columnHelper.accessor("status", { header: "Status" }),
  columnHelper.accessor("marks", { header: "Marks" }),
  columnHelper.accessor("gp", { header: "GP" }),
  columnHelper.accessor((row) => row.units * row.gp, { header: "WGP" }),
  columnHelper.accessor((row) => (row.marks >= 45 ? "Passed" : "Failed"), {
    header: "Remark",
  }),
];

export default function ResultDetailPage() {
  const { query } = useRouter();
  const id = query.id;
  const [semester, setSemester] = useState("all");

  let allResults: CourseResult[];
  let unitsRegistered: number;
  let unitsPassed: number;

  if (semester === "all") {
    allResults = [
      ...result.firstSemester.courses,
      ...result.secondSemester.courses,
    ];
    unitsRegistered =
      result.firstSemester.unitsRegistered +
      result.secondSemester.unitsRegistered;
    unitsPassed =
      result.firstSemester.unitsPassed + result.secondSemester.unitsPassed;
  } else if (semester === "first") {
    allResults = result.firstSemester.courses;
    unitsRegistered = result.firstSemester.unitsRegistered;
    unitsPassed = result.firstSemester.unitsPassed;
  } else {
    allResults = result.secondSemester.courses;
    unitsRegistered = result.secondSemester.unitsRegistered;
    unitsPassed = result.secondSemester.unitsPassed;
  }

  const gpa = (
    allResults.reduce((total, cr) => total + cr.gp * cr.units, 0) /
    unitsRegistered
  ).toFixed(2);

  return (
    <>
      <Seo title="Result Details" />
      <PageTitle showBackButton>{result.session} Session Result</PageTitle>
      <Flex justify="flex-end" mb={8}>
        <RadioButtonGroup
          labels={["All", "1st Semester", "2nd Semester"]}
          values={["all", "first", "second"]}
          value={semester}
          onChange={setSemester}
        />
      </Flex>
      <ResultBarChart
        courseResults={allResults}
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
