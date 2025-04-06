import axios, { AxiosInstance } from "axios";
import {
  AUTH_CLIENT_ID,
  AUTH_SERVER_URL,
  X_APP_KEY,
} from "../constants/config";

let api: AxiosInstance;

export default function getApi() {
  if (api) return api;

  const baseURL = window.localStorage.getItem("apiBaseUrl") || "";
  // if (baseURL.length === 0) {
  //   // proper error machanism should come here
  //   return false;
  // }
  const apiBaseUrl = baseURL + "/api";
  const headers: Record<string, string> = {
    "X-APP-KEY": X_APP_KEY,
  };

  if (process.env.NODE_ENV === "development") {
    headers["ngrok-skip-browser-warning"] = ",";
    headers["skip_zrok_interstitial"] = ",";
  }

  api = axios.create({
    baseURL: apiBaseUrl,
    headers,

    validateStatus: function (status) {
      return status < 500;
    },
  });

  api.interceptors.request.use((config) => {
    const key = `oidc.user:${AUTH_SERVER_URL}:${AUTH_CLIENT_ID}`;
    const rawToken = sessionStorage.getItem(key);
    const token = rawToken ? JSON.parse(rawToken).access_token : undefined;

    if (token) config.headers.set("Authorization", `Bearer ${token}`);

    return config;
  });

  return api;
}
