import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const initialBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const xAppKey = process.env.NEXT_PUBLIC_X_APP_KEY;

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
          
          fetch(url, {
            headers: { "ngrok-skip-browser-warning": ",", "X-APP-KEY": "${xAppKey}" },
          })
            .then((res) => res.json())
            .then((res) => {
              if (!res.status) throw new Error(res.message);
              return res.payload;
            })
            .then((payload) => localStorage.setItem("apiBaseUrl", payload))
            .catch((err) => {
              if (!document.location.href.includes("/error"))
                document.location.href = "/error";
            });
          `}
        </Script>
      </body>
    </Html>
  );
}
