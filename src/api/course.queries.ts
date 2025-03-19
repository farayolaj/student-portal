import { queryOptions } from "@tanstack/react-query";
import {
  toCourse,
  toCourseConfig,
  toCourseStatistics,
} from "../transformers/courses";
import getApi from "./api";

async function listCourses(semester: number) {
  const response = await getApi().get(
    `/allcourses/${encodeURI(Number(semester).toString())}`
  );

  if (!response.data.status) throw new Error(response.data.message);

  return (response.data.payload?.map(toCourse) || []) as Course[];
}

async function getCourseConfig() {
  const response = await getApi().get("/courseconfig");

  if (!response.data.status) throw new Error(response.data.message);

  return (response.data.payload?.map(toCourseConfig) || []) as CourseConfig[];
}

async function getCourseDetails(id: string) {
  const route = `/course_details/${encodeURIComponent(id)}`;
  const response = await getApi().get(route);

  if (!response.data.status) throw new Error("Could not fetch course details");

  return toCourse(response.data.payload);
}

async function getCourseStatistics(session: string, semester?: number) {
  let route = `/course_stats?session=${encodeURIComponent(session)}`;

  if (semester) route += `&semester=${encodeURIComponent(semester)}`;

  const response = await getApi().get(route);

  if (!response.data.status)
    throw new Error(
      response.data.message || "Could not fetch course statistics"
    );

  return toCourseStatistics(response.data.payload);
}

async function getRegisteredCourses(session: string, semester: number) {
  const semesterString = semester === 2 ? "second" : "first";
  const response = await getApi().get(
    `/courseenrollment/${encodeURI(session)}/${encodeURI(semesterString)}`
  );

  if (!response.data.status) throw new Error(response.data.message);

  return (response.data.payload?.map(toCourse) || []) as Course[];
}

async function getCourseDeletionOpen(semester: number) {
  const semesterString = semester === 2 ? "second" : "first";
  const response = await getApi().get(
    `/is_registration_delete_open?semester=${semesterString}`
  );

  return response.data.status as boolean;
}

async function getCourseRegOpen(semester: number) {
  const semesterString = semester === 2 ? "second" : "first";
  const response = await getApi().get(
    `/is_registration_open?semester=${semesterString}`
  );

  return response.data.status as boolean;
}

async function searchCourses(searchTerm: string) {
  const response = await getApi().get(
    `/search_course/${encodeURI(searchTerm)}`
  );

  if (!response.data.status) throw new Error(response.data.message);

  return (response.data.payload?.map(toCourse) || []) as Course[];
}

export const courseQueries = {
  all: () => ["courses"] as const,
  list: () => [...courseQueries.all(), "list"] as const,
  listBy: (semester: number) =>
    queryOptions({
      queryKey: [...courseQueries.list(), semester] as const,
      queryFn: () => listCourses(semester),
    }),
  config: () =>
    queryOptions({
      queryKey: [...courseQueries.all(), "config"] as const,
      queryFn: () => getCourseConfig(),
    }),
  details: () => [...courseQueries.all(), "details"] as const,
  detailsBy: (id: string) =>
    queryOptions({
      queryKey: [...courseQueries.details(), id] as const,
      queryFn: () => getCourseDetails(id),
    }),
  statistics: () => [...courseQueries.all(), "statistics"] as const,
  statisticsFor: (session: string, semester?: number) =>
    queryOptions({
      queryKey: [...courseQueries.statistics(), session, semester] as const,
      queryFn: () => getCourseStatistics(session, semester),
    }),
  registered: () => [...courseQueries.all(), "registered"] as const,
  registeredBy: (session: string, semester: number) =>
    queryOptions({
      queryKey: [...courseQueries.registered(), session, semester] as const,
      queryFn: () => getRegisteredCourses(session, semester),
    }),
  deletionOpen: () => [...courseQueries.all(), "deletion-open"] as const,
  deletionOpenBy: (semester: number) =>
    queryOptions({
      queryKey: [...courseQueries.deletionOpen(), semester] as const,
      queryFn: () => getCourseDeletionOpen(semester),
    }),
  registrationOpen: () =>
    [...courseQueries.all(), "registration-open"] as const,
  registrationOpenBy: (semester: number) =>
    queryOptions({
      queryKey: [...courseQueries.registrationOpen(), semester] as const,
      queryFn: () => getCourseRegOpen(semester),
    }),
  search: () => [...courseQueries.all(), "search"] as const,
  searchBy: (searchTerm: string) =>
    queryOptions({
      queryKey: [...courseQueries.search(), searchTerm] as const,
      queryFn: () => searchCourses(searchTerm),
    }),
};
