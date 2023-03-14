import { createQuery } from "react-query-kit";
import { toCourse } from "../../transformers/courses";
import getApi from "../api";

export const useAllCourses = createQuery<Course[], { semester: number }>(
  "all-courses",
  async ({ queryKey: [_, { semester }] }) => {
    const response = await getApi().get(
      `/allcourses/${encodeURI(Number(semester).toString())}`
    );

    if (!response.data.status) throw new Error(response.data.message);

    return (response.data.payload?.map(toCourse) || []) as Course[];
  }
);
