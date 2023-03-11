import { createQuery } from "react-query-kit";
import api from "../api";
import { toCourseStatistics } from "../../transformers/courses";

export const useCourseStatistics = createQuery<
  CourseStatistics,
  { session: string; semester?: number }
>("course-statistics", async ({ queryKey: [_, { session, semester }] }) => {
  let route = `/course_stats?session=${session}`;

  if (semester) route += `&semester=${encodeURIComponent(semester)}`;

  const response = await api.get(route);

  if (!response.data.status)
    throw new Error("Could not fetch course statistics");

  return toCourseStatistics(response.data.data);
});
