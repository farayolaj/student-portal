import { extendTheme } from "@chakra-ui/react";
import { Nunito } from "next/font/google";
import { buttonTheme } from "./components/Button";
import { cardTheme } from "./components/Card";
import { linkTheme } from "./components/Link";

const nunito = Nunito({ subsets: ["latin"] });

const components = {
  Button: buttonTheme,
  Card: cardTheme,
  Link: linkTheme,
};

const colors = {
  primary: {
    50: "#F0FFF4",
    100: "#C6F6D5",
    200: "#9AE6B4",
    300: "#68D391",
    400: "#48BB78",
    500: "#38A169",
    600: "#2F855A",
    700: "#276749",
    800: "22543D",
    900: "#1C4532",
  },
};

const semanticTokens = {
  colors: {
    primary: "green",
  },
};

const fonts = {
  heading: nunito.style.fontFamily,
  body: nunito.style.fontFamily,
};

const theme = extendTheme({ components, colors, fonts, semanticTokens });

export default theme;
