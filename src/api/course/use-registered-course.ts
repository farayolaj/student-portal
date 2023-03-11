import { createQuery } from "react-query-kit";
import api from "../api";
import { fromEnrollmenttoCourse } from "../../transformers/courses";

const useRegisteredCourses = createQuery(
  "registered-courses",
  async ({ queryKey: [_, { session }] }) => {
    const response = await api.get(`/courseenrollment/${session}`);

    return response.data.data.payload.map(fromEnrollmenttoCourse) as Course[];
  }
);
