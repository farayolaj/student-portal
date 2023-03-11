import { getCourseConfig } from "../../api/courses";
import { createQueryHelper } from "../../lib/create-query-helper";

export const useCourseConfig = createQueryHelper(
  "course-config",
  getCourseConfig
);
