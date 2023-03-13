import axios from "axios";
import { API_URL, X_APP_KEY } from "../constants/config";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "X-APP-KEY": X_APP_KEY,
    "ngrok-skip-browser-warning": ",",
  },
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
