import axios from "axios";
import { API_URL, X_APP_KEY } from "../constants/config";

const headers: Record<string, string> = {
  "X-APP-KEY": X_APP_KEY,
};

if (process.env.NODE_ENV === "development")
  headers["ngrok-skip-browser-warning"] = ",";

const api = axios.create({
  baseURL: API_URL,
  headers,

  validateStatus: function (status) {
    return status < 500;
  },
});

api.interceptors.request.use((config) => {
  const rawToken = localStorage.getItem("token");
  const token = rawToken ? JSON.parse(rawToken) : undefined;

  if (token) config.headers.set("Authorization", `Bearer ${token}`);

  return config;
});

export default api;
