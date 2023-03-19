import { createQuery } from "react-query-kit";
import { toProfile } from "../../transformers/profile";
import getApi from "../api";

export async function getProfile() {
  const response = await getApi().get("/profile");

  if (!response.data.status)
    throw new Error("Could not fetch user profile", {
      cause: new Error(response.data.message),
    });

  return toProfile(response.data.payload);
}

export const useProfile = createQuery("profile", getProfile);
