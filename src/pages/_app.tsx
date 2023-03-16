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
import { useEffect } from "react";
import getApi from "../api/api";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { layoutProps: LayoutProps };
};

export default function App({ Component, pageProps }: CustomAppProps) {

  const loadBasePath = async ()=>{
    const initialBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const hostname = encodeURIComponent(window.location.hostname);
    const url = `${initialBaseUrl}/baseUrl?domain=${hostname}`;
    const res = await getApi().get(url);
    localStorage.setItem("apiBaseUrl", res.data.payload);
  };

  useEffect( () => {
    loadBasePath();
  }, []);

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
