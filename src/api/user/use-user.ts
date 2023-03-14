import { createQuery } from "react-query-kit";
import { toUser } from "../../transformers/user";
import getApi from "../api";

export async function getUser() {
  const response = await getApi().get("/profile");

  if (!response.data.status) throw new Error("Could not fetch user details");

  return toUser(response.data.payload);
}

export const useUser = createQuery("user", getUser);
