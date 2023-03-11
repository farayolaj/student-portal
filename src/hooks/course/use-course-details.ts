import { getCourseDetails } from "../../api/courses";
import { createQueryHelper } from "../../lib/create-query-helper";

export const usCourseDetails = createQueryHelper(
  "course-details",
  getCourseDetails
);
