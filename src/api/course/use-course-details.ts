import { createQuery } from "react-query-kit";
import api from "../api";
import { fromDetailsToCourse } from "../../transformers/courses";

export const useCourseDetails = createQuery<Course, { courseId: string }>(
  "course-details",
  async ({ queryKey: [_, { courseId }] }) => {
    const route = `/course_details/${encodeURIComponent(courseId)}`;
    const response = await api.get(route);

    if (!response.data.status)
      throw new Error("Could not fetch course details");

    return fromDetailsToCourse(response.data.payload);
  }
);
