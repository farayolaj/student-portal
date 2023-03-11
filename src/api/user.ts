import api from ".";
import { toUser } from "../transformers/user";

export async function getUser() {
  const response = await api.get("/profile");

  if (!response.data.status) throw new Error("Could not fetch user details");

  return toUser(response.data.payload);
}
