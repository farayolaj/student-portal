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
  const green400 = useToken("colors", "green.400");
  const blue400 = useToken("colors", "blue.400");
  const gray400 = useToken("colors", "gray.400");
  const yellow400 = useToken("colors", "yellow.400");

  return (
    <Box {...boxProps}>
      <Bar
        data={{
          labels: courseResults.map((cr) => cr.courseCode),
          datasets: [
            {
              backgroundColor: courseResults.map((cr) =>
                cr.totalScore >= 70
                  ? yellow400
                  : cr.totalScore >= 50
                  ? blue400
                  : cr.totalScore >= 40
                  ? green400
                  : gray400
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
