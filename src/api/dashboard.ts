import api from ".";
import { toDashboardInfo, toSession } from "../transformers/dashboard";

export async function getDashboardInfo() {
  try {
    const response = await api.get("/dashboard");

    if (!response.data.status)
      throw new Error("Could not fetch dashboard info");

    return toDashboardInfo(response.data.payload);
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
