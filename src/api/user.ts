import parse from "date-fns/parse";
import api from ".";

export async function getUser() {
  // const response = await api.get("/user");

  // if (!response.data.status) throw new Error("Could not fetch user details");

  // return response.data.data as User;
  return {
    email: "email",
    firstName: "firstName",
    lastName: "lastName",
    matricNumber: "matricNumber",
    id: "id",
    dob: new Date(),
    gender: "Male",
    phone: "phone",
  } as User;
}
