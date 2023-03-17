import { Box, BoxProps, useToken } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  Tooltip,
  LinearScale,
  BarElement,
  CategoryScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type ResultBarChartProps = {
  courseResults: ResultSummary[];
  showAxes?: boolean;
} & BoxProps;

export default function ResultBarChart({
  courseResults,
  showAxes = false,
  ...boxProps
}: ResultBarChartProps) {
  const green500 = useToken("colors", "green.500");
  const blue500 = useToken("colors", "blue.500");
  const red500 = useToken("colors", "red.500");

  return (
    <Box {...boxProps}>
      <Bar
        data={{
          labels: courseResults.map((cr) => cr.courseCode),
          datasets: [
            {
              backgroundColor: courseResults.map((cr) =>
                cr.totalScore >= 70
                  ? green500
                  : cr.totalScore >= 45
                  ? blue500
                  : red500
              ),
              data: courseResults.map((cr) => cr.totalScore),
              label: "Score",
            },
          ],
        }}
        options={{
          responsive: true,
          scales: {
            y: {
              display: showAxes,
              max: 100,
              beginAtZero: true,
              grid: {
                display: false,
              },
            },
            x: {
              display: showAxes,
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </Box>
  );
}
