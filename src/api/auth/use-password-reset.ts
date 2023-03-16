import { createMutation } from "react-query-kit";
import getApi from "../api";

async function resetPassword({ username }: { username: string }) {
  const response = await getApi().post("/reset_password", {
    user_login: username,
  });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}

export const usePasswordReset = createMutation(resetPassword);
