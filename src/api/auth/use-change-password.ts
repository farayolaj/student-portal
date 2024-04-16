import { createMutation } from "react-query-kit";
import getApi from "../api";

type UseChangePasswordProps = {
  currentPassword: string;
  newPassword: string;
};

export const useChangePassword = createMutation(
  async ({ currentPassword, newPassword }: UseChangePasswordProps) => {
    const data = {
      current_password: currentPassword,
      user_pass: newPassword,
    };
 
    const response = await getApi().post("/password", data);

    if (!response.data.status) throw new Error(response.data.message);

    return;
  }
);
