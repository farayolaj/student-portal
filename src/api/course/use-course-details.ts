import { createQuery } from "react-query-kit";
import getApi from "../api";
import { toCourse } from "../../transformers/courses";

export const useCourseDetails = createQuery<Course, { courseId: string }>(
  "course-details",
  async ({ queryKey: [_, { courseId }] }) => {
    const route = `/course_details/${encodeURIComponent(courseId)}`;
    const response = await getApi().get(route);

    if (!response.data.status)
      throw new Error("Could not fetch course details");

    return toCourse(response.data.payload);
  }
);
