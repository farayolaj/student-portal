import { createQuery } from "react-query-kit";
import getApi from "../api";
import { toCourse } from "../../transformers/courses";

export const useRegisteredCourses = createQuery<
  Course[],
  { session: string; semester: number }
>("registered-courses", async ({ queryKey: [_, { session, semester }] }) => {
  const semesterString = semester === 2 ? "second" : "first";
  const response = await getApi().get(
    `/courseenrollment/${encodeURI(session)}/${encodeURI(semesterString)}`
  );

  if (!response.data.status) throw new Error(response.data.message);

  return (response.data.payload?.map(toCourse) || []) as Course[];
});
