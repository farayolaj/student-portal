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
      </body>
    </Html>
  );
}
