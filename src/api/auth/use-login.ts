import { createMutation } from "react-query-kit";
import getApi from "../api";
import { toUser } from "../../transformers/profile";

export type LoginCredential = {
  username: string;
  password: string;
};

export async function login({ username, password }: LoginCredential) {
  const response = await getApi().post("authenticate", {
    user_login: username,
    user_pass: password,
  });

  if (!response.data.status) throw new Error("Invalid username or password");

  return {
    token: response.data.payload.token,
    user: toUser({
      ...response.data.payload.profile,
      current_session: response.data.payload.current_session,
      current_semester: response.data.payload.current_semester,
    }),
  };
}

export const useLogin = createMutation(login);
