import api from ".";
import { toCourse, toCourseStatistics } from "../transformers/courses";
import { toSession } from "../transformers/dashboard";

export async function getRegisteredCourses({ session }: { session: string }) {
  try {
    const response = await api.get(`/courseenrollment/${session}`);

    return response.data.data.payload.map(toCourse) as Course[];
  } catch (e) {
    throw new Error("Internal server error");
  }
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

  try {
    const response = await api.get(route);

    if (!response.data.status)
      throw new Error("Could not fetch course statistics");

    return toCourseStatistics(response.data.data);
  } catch (e) {
    throw new Error("Internal server error");
  }
}

export async function getAllSessions() {
  try {
    const response = await api.get("/allsessions");

    if (!response.data.status) throw new Error("Could not fetch sessions");

    return response.data.payload.map(toSession) as Session[];
  } catch (e) {
    throw new Error("Internal server error");
  }
}
