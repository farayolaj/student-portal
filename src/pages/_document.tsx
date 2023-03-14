import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const initialBaseUrl = process.env.NEXT_PUBLIC_INITIAL_API_URL;
  const hostname = window.location.hostname;
  const url = `${initialBaseUrl}/baseUrl?domain=${encodeURIComponent(hostname)}`

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script id="fetch-api-base-url" strategy="beforeInteractive">
          {`fetch("${url}")
              .then((res) => res.json())
              .then((res) => localStorage.setItem("apiBaseUrl", res.payload));`}
        </Script>
      </body>
    </Html>
  );
}
