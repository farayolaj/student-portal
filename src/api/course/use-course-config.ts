import { createQuery } from "react-query-kit";
import getApi from "../api";
import { toCourseConfig } from "../../transformers/courses";

export const useCourseConfig = createQuery("course-config", async () => {
  const response = await getApi().get("/courseconfig");

  if (!response.data.status) throw new Error(response.data.message);

  return (response.data.payload?.map(toCourseConfig) || []) as CourseConfig[];
});
