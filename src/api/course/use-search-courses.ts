import { createQuery } from "react-query-kit";
import { fromPreloadToCourse } from "../../transformers/courses";
import api from "../api";

export const useSearchCourses = createQuery<Course[], { searchTerm: string }>(
  "search-courses",
  async ({ queryKey: [_, { searchTerm }] }) => {
    const response = await api.get(`/search_course/${encodeURI(searchTerm)}`);

    if (!response.data.status) throw new Error(response.data.message);

    return (response.data.payload?.map(fromPreloadToCourse) || []) as Course[];
  }
);
