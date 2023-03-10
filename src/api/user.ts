import api from ".";

export async function getUser() {
  try {
    // const response = await api.get("user");

    // if (!response.data.status) throw new Error("Could not fetch user details");

    // return response.data.data as User;
    return {
      email: "email",
      firstName: "firstName",
      lastName: "lastName",
      matricNumber: "matricNumber",
      id: "id",
    } as User;
  } catch (e) {
    throw new Error("Internal server error");
  }
}
