import { createMutation } from "react-query-kit";
import getApi from "../api";

async function deleteCourses({ ids }: { ids: string[] }) {
  const response = await getApi().post("/unregister", { data: ids });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}

export const useDeleteCourses = createMutation(deleteCourses);
