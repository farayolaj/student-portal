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

type CustomAppProps = AppProps & {
  Component: NextComponentType & { layoutProps: LayoutProps };
};

export default function App({ Component, pageProps }: CustomAppProps) {
  const router = useRouter();
  const [hasApiBaseUrl, setHasApiBaseUrl] = useState(false);

  useEffect(() => {
    const initialBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const hostname = encodeURIComponent(window.location.hostname);
    const url = `${initialBaseUrl}/baseUrl?domain=${hostname}`;
    getApi()
      .get(url)
      .then((res) => {
        localStorage.setItem("apiBaseUrl", res.data.payload);
        setHasApiBaseUrl(true);
      })
      .catch((_error) => router.push(ERROR_PAGE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const layoutProps = Component.layoutProps || {};

  if (!hasApiBaseUrl) return null;

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
