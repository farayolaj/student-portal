import api from ".";
import {
  fromDetailsToCourse,
  fromEnrollmenttoCourse,
  toCourseConfig,
  toCourseStatistics,
} from "../transformers/courses";
import { toSession } from "../transformers/dashboard";

export async function getRegisteredCourses({ session }: { session: string }) {
  const response = await api.get(`/courseenrollment/${session}`);

  return response.data.data.payload.map(fromEnrollmenttoCourse) as Course[];
}

export async function getCourseStatistics({
  session,
  semester,
}: {
  session: string;
  semester?: number;
}) {
  let route = `/course_stats?session=${session}`;

  if (semester) route += `&semester=${encodeURIComponent(semester)}`;

  const response = await api.get(route);

  if (!response.data.status)
    throw new Error("Could not fetch course statistics");

  return toCourseStatistics(response.data.data);
}

export async function getAllSessions() {
  const response = await api.get("/allsessions");

  if (!response.data.status) throw new Error("Could not fetch sessions");

  return response.data.payload.map(toSession) as Session[];
}

export async function getCourseDetails({ courseId }: { courseId: string }) {
  const route = `/course_details/${encodeURIComponent(courseId)}`;
  const response = await api.get(route);

  if (!response.data.status) throw new Error("Could not fetch course details");

  return fromDetailsToCourse(response.data.payload);
}

export async function getCourseConfig() {
  const response = await api.get("/courseconfig");

  if (!response.data.status) throw new Error(response.data.message);

  return response.data.payload.map(toCourseConfig) as CourseConfig[];
}
