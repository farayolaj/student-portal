import axios, { AxiosInstance } from "axios";
import {
  AUTH_CLIENT_ID,
  AUTH_SERVER_URL,
  X_APP_KEY,
} from "../constants/config";

const apiMap: Record<string, AxiosInstance> = {};

export default function getApi(prefix = "/api") {
  if (apiMap[prefix]) return apiMap[prefix];

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  const headers: Record<string, string> = {
    "X-APP-KEY": X_APP_KEY,
  };

  if (process.env.NODE_ENV === "development") {
    headers["ngrok-skip-browser-warning"] = ",";
    headers["skip_zrok_interstitial"] = ",";
  }

  apiMap[prefix] = axios.create({
    baseURL: apiBaseUrl + prefix,
    headers,

    validateStatus: function (status) {
      return status < 500;
    },
  });

  apiMap[prefix].interceptors.request.use((config) => {
    const key = `oidc.user:${AUTH_SERVER_URL}:${AUTH_CLIENT_ID}`;
    const rawToken = sessionStorage.getItem(key);
    const token = rawToken ? JSON.parse(rawToken).access_token : undefined;

    if (token) config.headers.set("Authorization", `Bearer ${token}`);

    return config;
  });

  return apiMap[prefix];
}
