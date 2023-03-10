import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../theme";
import "../components/common/calendar.css";
import Layout, { LayoutProps } from "../components/layout";
import { NextComponentType } from "next";

type CustomAppProps = AppProps & {
  Component: NextComponentType & { layoutProps: LayoutProps};
}

export default function App({ Component, pageProps }: CustomAppProps) {
  const layoutProps = Component.layoutProps || {};
  return (
    <ChakraProvider theme={theme}>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
