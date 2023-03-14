import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const initialBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script id="fetch-api-base-url" strategy="beforeInteractive">
          {`
          const hostname = encodeURIComponent(window.location.hostname);
          const url = "${initialBaseUrl}/baseUrl?domain=" + hostname;
          fetch(url, { headers: { "ngrok-skip-browser-warning": "," } })
              .then((res) => res.json())
              .then((res) => localStorage.setItem("apiBaseUrl", res.payload))
              .catch(err => { if (!document.location.href.includes('/error')) document.location.href = "/error"; })`}
        </Script>
      </body>
    </Html>
  );
}
