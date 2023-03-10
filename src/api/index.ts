import axios from "axios";
import { API_URL, X_APP_KEY } from "../constants/config";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    X_APP_KEY: X_APP_KEY,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) config.headers.set("Authorization", `Bearer ${token}`);

  return config;
});

export default api;
