import { createMutation } from "react-query-kit";
import api from "../api";

async function addCourses({ courseIds }: { courseIds: Course["id"][] }) {
  const response = await api.post("/courseregistration", { data: courseIds });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}

const useAddCourses = createMutation(addCourses);
