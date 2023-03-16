import { createMutation } from "react-query-kit";
import getApi from "../api";

async function addCourses({ courseIds }: { courseIds: Course["id"][] }) {
  const response = await getApi().post("/courseregistration", {
    data: courseIds,
  });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}

export const useAddCourses = createMutation(addCourses);
