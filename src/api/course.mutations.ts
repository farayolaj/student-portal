import getApi from "./api";

export async function addCourses({ courseIds }: { courseIds: Course["id"][] }) {
  const response = await getApi().post("/courseregistration", {
    data: courseIds,
  });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}

export async function deleteCourses({ ids }: { ids: string[] }) {
  const response = await getApi().post("/unregister", { data: ids });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}
