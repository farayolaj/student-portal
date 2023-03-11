import { createQuery } from "react-query-kit";
import { toCourse } from "../../transformers/courses";
import api from "../api";

export const useAllCourses = createQuery<Course[], { semester: string }>(
  "all-courses",
  async ({ queryKey: [_, { semester }] }) => {
    const response = await api.get(`/allcourses/${encodeURI(semester)}`);

    if (!response.data.status) throw new Error(response.data.message);

    return (response.data.payload?.map(toCourse) || []) as Course[];
  }
);
