import { extendTheme } from "@chakra-ui/react";
import { buttonTheme } from "./components/Button";
import { cardTheme } from "./components/Card";
import { linkTheme } from "./components/Link";

const components = {
  Button: buttonTheme,
  Card: cardTheme,
  Link: linkTheme,
};

const colors = {
  transparent: {
    50: "transparent",
    100: "transparent",
    200: "transparent",
    300: "transparent",
    400: "transparent",
    500: "transparent",
    600: "transparent",
    700: "transparent",
    800: "transparent",
    900: "transparent",
  },
};

const theme = extendTheme({ components, colors });

export default theme;
