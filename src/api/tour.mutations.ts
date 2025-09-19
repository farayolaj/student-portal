import getApi from "./api";

export async function registerTourCourse() {
  const response = await getApi("/v1/api").post("/course/tour/create");

  if (!response.data.status) {
    throw new Error(response.data.message);
  }

  return;
}

export async function unregisterTourCourse() {
  const response = await getApi("/v1/api").post("/course/tour/delete");

  if (!response.data.status) {
    throw new Error(response.data.message);
  }

  return;
}
