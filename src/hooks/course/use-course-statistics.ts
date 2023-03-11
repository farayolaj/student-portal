import { getCourseStatistics } from "../../api/courses";
import { createQueryHelper } from "../../lib/create-query-helper";

export const useCourseStatistics = createQueryHelper(
  "course-statistics",
  getCourseStatistics
);
