import api from ".";

export type LoginCredential = {
  username: string;
  password: string;
};

export async function login({ username, password }: LoginCredential) {
  try {
    const response = await api.post("authenticate", {
      user_login: username,
      user_pass: password,
    });

    if (!response.data.status) throw new Error("Invalid username or password");

    return response.data.date.token as string;
  } catch (e) {
    throw new Error("Internal server error");
  }
}

export async function resetPassword({ username }: { username: string }) {
  try {
    const response = await api.post("reset_password", {
      user_login: username,
    });

    if (!response.data.status)
      throw new Error("Invalid matric. number or email address");

    return;
  } catch (e) {
    throw new Error("Internal server error");
  }
}
