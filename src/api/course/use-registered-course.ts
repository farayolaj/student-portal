import { createQuery } from "react-query-kit";
import api from "../api";
import { toCourse } from "../../transformers/courses";

export const useRegisteredCourses = createQuery<Course[], { session: string }>(
  "registered-courses",
  async ({ queryKey: [_, { session }] }) => {
    const response = await api.get(`/courseenrollment/${encodeURI(session)}`);

    if (!response.data.status) throw new Error("Could not fetch courses");

    return response.data.payload.map(toCourse) as Course[];
  }
);
