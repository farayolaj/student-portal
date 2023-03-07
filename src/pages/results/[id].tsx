import { useRouter } from "next/router";
import PageTitle from "../../components/common/page-title";
import Seo from "../../components/common/seo";
import Table from "../../components/common/custom-table";
import ResultDetailOverview from "../../components/results/details/result-detail-overview";
import { createColumnHelper } from "@tanstack/react-table";
import { Box, Text } from "@chakra-ui/react";

const result: Result = {
  id: "1",
  session: "2019/2020",
  semester: "First Semester",
  gpa: 3.69,
  unitsRegistered: 102,
  unitsPassed: 102,
  courses: [
    {
      id: "CSC 101",
      title: "Introduction to Computer Science",
      status: "Required",
      marks: 70,
      gp: 3,
      units: 3,
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

  return (
    <>
      <Seo title="Result Details" />
      <ResultBarChart
        courseResults={allResults}
        display="flex"
        w="full"
        justifyContent="center"
        h={40}
        showAxes
      />
      <ResultDetailOverview
        gpa={result.gpa}
        unitsRegistered={result.unitsRegistered}
        unitsPassed={result.unitsPassed}
      />
      <Box mt={8}>
        <Table
          columns={columns}
          data={result.courses}
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
