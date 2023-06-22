import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../theme";
import "../components/common/calendar.css";
import Layout, { LayoutProps } from "../components/layout";
import { NextComponentType } from "next";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "../lib/query-client";
import { AuthProvider } from "../hooks/use-auth";
import { useEffect, useState } from "react";
import getApi from "../api/api";
import { useRouter } from "next/router";
import { ERROR_PAGE } from "@/constants/routes";
import useLocalStorage from "@/hooks/use-local-storage";
import axios from "axios";
import { X_APP_KEY } from "@/constants/config";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { layoutProps: LayoutProps };
};

async function getBaseApiUrl() {
  const initialBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const hostname = encodeURIComponent(window.location.hostname).replace(
    "starrising",
    "localhost"
  );
  const url = `${initialBaseUrl}/baseUrl?domain=${hostname}`;
  const headers: Record<string, string> = {
    "X-APP-KEY": X_APP_KEY,
  };

  if (process.env.NODE_ENV === "development")
    headers["ngrok-skip-browser-warning"] = ",";

  try {
    const res = await axios.get(url, { headers });
    return res.data.payload as string;
  } catch (error) {
    throw error;
  }
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const { push } = useRouter();

  useEffect(() => {
    getBaseApiUrl()
      .then((url) => localStorage.setItem("apiBaseUrl", url))
      .catch((_error) => push(ERROR_PAGE));
  }, [push]);

  const layoutProps = Component.layoutProps || {};

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Layout {...layoutProps}>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
