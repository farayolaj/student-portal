import localFont from "next/font/local";

export const avenirNextLTPro = localFont({
  adjustFontFallback: "Arial",
  src: [
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-UltLt.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-UltLtIt.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-It.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-MediumIt.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-Demi.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-DemiIt.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-BoldIt.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-Heavy.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./avenir-next-lt-pro/AvenirNextLTPro-HeavyIt.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-avenir-next-lt-pro",
  preload: true,
});


