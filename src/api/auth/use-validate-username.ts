import { createMutation } from "react-query-kit";
import getApi from "../api";

async function validateUsername({ username }: { username: string }) {
  const response = await getApi().post("/validate_student", {
    user_login: username,
  });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}

export const useValidateUsername = createMutation(validateUsername);
