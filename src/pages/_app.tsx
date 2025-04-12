import AuthProvider from "@/components/common/auth-provider";
import { X_APP_KEY } from "@/constants/config";
import { ERROR_PAGE } from "@/constants/routes";
import { avenirNextLTPro } from "@/theme/fonts";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import { NextComponentType } from "next";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../components/common/calendar.css";
import "../components/landing/landing.css";
import Layout, { LayoutProps } from "../components/layout";
import queryClient from "../lib/query-client";
import theme from "../theme";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { layoutProps: LayoutProps };
};

export default function App({ Component, pageProps }: CustomAppProps) {
  const layoutProps = Component.layoutProps || {};

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <div className={avenirNextLTPro.className}>
            <Layout {...layoutProps}>
              <Component {...pageProps} />
            </Layout>
          </div>
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
