import api from ".";
import { toDashboardInfo } from "../transformers/dashboard";

export async function getDashboardInfo() {
  try {
    const response = await api.get("/student_dashboard");

    if (!response.data.status)
      throw new Error("Could not fetch dashboard info");

    return toDashboardInfo(response.data.payload);
  } catch (e) {
    throw new Error("Internal server error");
  }
}
