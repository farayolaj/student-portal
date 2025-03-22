import getApi from "./api";

type UseChangePasswordProps = {
  currentPassword: string;
  newPassword: string;
};

export async function changePassword({
  currentPassword,
  newPassword,
}: UseChangePasswordProps) {
  const data = {
    current_password: currentPassword,
    user_pass: newPassword,
  };

  const response = await getApi().post("/password", data);

  if (!response.data.status) throw new Error(response.data.message);

  return;
}

export async function resetPassword({ username }: { username: string }) {
  const response = await getApi().post("/reset_password", {
    user_login: username,
  });

  if (!response.data.status) throw new Error(response.data.message);

  return;
}
