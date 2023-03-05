import "@/styles/globals.css";
import { Box, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import theme from "../theme";
import "../components/common/calendar.css";
import Layout from "../components/layout";

const nunito = Nunito({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box w="100vw" minH="100vh" className={nunito.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Box>
    </ChakraProvider>
  );
}
