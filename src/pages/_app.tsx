import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../theme";
import "../components/common/calendar.css";
import Layout, { LayoutProps } from "../components/layout";
import { NextComponentType } from "next";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "../lib/query-client";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { layoutProps: LayoutProps };
};

export default function App({ Component, pageProps }: CustomAppProps) {
  const layoutProps = Component.layoutProps || {};
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
