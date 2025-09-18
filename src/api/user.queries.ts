import { queryOptions } from "@tanstack/react-query";
import { toSession } from "../transformers/dashboard";
import { toProfile } from "../transformers/profile";
import filterUnique from "../utils/filter-unique";
import getApi from "./api";

async function getProfile() {
  const response = await getApi("/v1/api").get("/student/profile");

  if (!response.data.status)
    throw new Error("Could not fetch user profile", {
      cause: new Error(response.data.message),
    });

  return toProfile(response.data.payload);
}

async function listAllSessions() {
  const response = await getApi().get("/allsessions");

  if (!response.data.status) throw new Error("Could not fetch sessions");

  const sessions = (response.data.payload?.map(toSession) || []) as Session[];
  return filterUnique(sessions, (session) => session.id);
}

async function getUniversityRoomLink() {
  const response = await getApi("/v1/api").get("/student/university_room_link");

  if (!response.data.status)
    throw new Error("Could not fetch university room link", {
      cause: new Error(response.data.message),
    });

  return response.data.payload as string | null;
}

export const userQueries = {
  profile: () =>
    queryOptions({
      queryKey: ["profile"],
      queryFn: getProfile,
    }),
  sessions: () =>
    queryOptions({
      queryKey: ["sessions"],
      queryFn: listAllSessions,
    }),
  universityRoomLink: () =>
    queryOptions({
      queryKey: ["universityRoomLink"],
      queryFn: getUniversityRoomLink,
    }),
};
