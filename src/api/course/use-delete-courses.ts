import { createMutation } from "react-query-kit";
import api from "../api";

async function deleteCourses({ ids }: { ids: string[] }) {
  const response = await api.post("/unregister", { data: ids });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}

export const useDeleteCourses = createMutation(deleteCourses);
