import axios, { AxiosInstance } from "axios";
import { X_APP_KEY } from "../constants/config";

let api: AxiosInstance;

export default function getApi() {
  if (api) return api;

  const apiBaseUrl = global.localStorage.getItem("apiBaseUrl") || "";

  const headers: Record<string, string> = {
    "X-APP-KEY": X_APP_KEY,
  };

  if (process.env.NODE_ENV === "development")
    headers["ngrok-skip-browser-warning"] = ",";

  api = axios.create({
    baseURL: apiBaseUrl,
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

  return api;
}
