import { createQuery } from "react-query-kit";
import { toCourse } from "../../transformers/courses";
import getApi from "../api";

export const useSearchCourses = createQuery<Course[], { searchTerm: string }>(
  "search-courses",
  async ({ queryKey: [_, { searchTerm }] }) => {
    const response = await getApi().get(
      `/search_course/${encodeURI(searchTerm)}`
    );

    if (!response.data.status) throw new Error(response.data.message);

    return (response.data.payload?.map(toCourse) || []) as Course[];
  }
);
